// Server - initialises node.js server using a MySQL database and JWT authentiction

// imports
require('dotenv').config(); // loads variables from .env files
const express = require('express'); // web framework
const path = require('path'); // handle file paths
const cors = require('cors'); // enables frontend comms
const mysql = require('mysql2/promise'); // MySQL client for node.js
const bcrypt = require('bcrypt'); // hashes passwords
const jwt = require('jsonwebtoken'); // authentication reasons
const multer = require('multer'); // handles file uploads
const { body, validationResult } = require('express-validator'); // validates user input

// initialises express app
const app = express();
const port = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || '121212asasadqweqe1231';

// Create MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'job_portal',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test database connection
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Database connected successfully');
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
}

// Middleware
app.use(express.json()); // parses JSON and converts into JavaScript
app.use(express.urlencoded({ extended: true })); // parses URL commands
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));


// JWT Authentication middleware - if login credentials are correct, JWT token is generated and user is allowed into dashboard
function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ 
        status: 'error',
        message: 'Access denied. No token provided.' 
      });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ 
          status: 'error',
          message: 'Invalid or expired token' 
        });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error',
      message: 'Authentication error' 
    });
  }
}

// Register endpoint - validates info, checks if credentials are already in database, and hashes password for security
app.post(
  '/auth/register',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('username').notEmpty().withMessage('Username is required'),
    body('dob').notEmpty().isDate().withMessage('Valid date of birth is required'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          status: 'error',
          errors: errors.array() 
        });
      }

      const { email, password, username, dob } = req.body;

      // Check if user exists
      const [existing] = await pool.execute('SELECT id FROM users WHERE email = ?', [email]);
      if (existing.length > 0) {
        return res.status(400).json({ 
          status: 'error',
          message: 'User already exists' 
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Insert user
      const [result] = await pool.execute(
        'INSERT INTO users (email, password, username, dob) VALUES (?, ?, ?, ?)',
        [email, hashedPassword, username, dob]
      );
      
      // Get user data
      const [user] = await pool.execute(
        'SELECT id, email, username, dob FROM users WHERE id = ?',
        [result.insertId]
      );

      const token = jwt.sign(user[0], JWT_SECRET, { expiresIn: '1h' });
      
      res.status(201).json({
        status: 'success',
        message: 'Registration successful',
        data: {
          user: user[0],
          token
        }
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ 
        status: 'error',
        message: 'Registration failed' 
      });
    }
  }
);

// Login endpoint
app.post(
  '/auth/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          status: 'error',
          errors: errors.array() 
        });
      }

      const { email, password } = req.body;
      console.log(email);
      const [users] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
      console.log(users);
      if (users.length === 0) {
        return res.status(401).json({ 
          status: 'error',
          message: 'Invalid credentials' 
        });
      }

      const user = users[0];
      const passwordMatch = await bcrypt.compare(password, user.password);
      
      if (!passwordMatch) {
        console.log('password not match');
        return res.status(401).json({ 
          status: 'error',
          message: 'Invalid credentials' 
        });
      }

      const userData = {
        id: user.id,
        email: user.email,
        username: user.username,
        dob: user.dob
      };

      const token = jwt.sign(userData, JWT_SECRET, { expiresIn: '1h' });
      
      res.json({
        status: 'success',
        message: 'Login successful',
        data: {
          user: userData,
          token
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ 
        status: 'error',
        message: 'Login failed' 
      });
    }
  }
);

// Jobs routes - for user input in the search area of the dashboard
app.get('/api/jobs', async (req, res) => {
  try {
    console.log(req.query);
    const { search, type, location, salary, skills } = req.query;
    let query = 'SELECT * FROM jobs WHERE 1=1'; // initial query
    const params = [];

    // searches for if the job title or company name is within the search keyword
    if (search) {
      query += ' AND (LOWER(title) LIKE ? OR LOWER(company) LIKE ?)'; // appends query
      params.push(`%${search.toLowerCase()}%`, `%${search.toLowerCase()}%`); // allows partial matches
    }
    // searches for if type is within the search keyword
    if (type) {
      query += ' AND type = ?';
      params.push(type);
    }
    // searches for if location is within the search keyword
    if (location) {
      query += ' AND LOWER(location) LIKE ?';
      params.push(`%${location.toLowerCase()}%`);
    }
    // searches for if salary is within the keyword
    if (salary) {
      query += ' AND CAST(SUBSTRING_INDEX(salary, "k", 1) AS UNSIGNED) >= ?';
      params.push(parseInt(salary));
    }
    // searches for if skills is within the keyword
    if (skills) {
      skills.split(',').forEach(skill => {
        query += ' AND LOWER(skills) LIKE ?';
        params.push(`%${skill.trim().toLowerCase()}%`);
      });
    }



    const [jobs] = await pool.execute(query, params);

    console.log(jobs); 
    res.setHeader('Content-Type', 'application/json'); 
    res.json({
      status: 'success',
      data: jobs
    });
  } catch (error) {
    console.error('Jobs fetch error:', error);
    res.status(500).json({ 
      status: 'error',
      message: 'Failed to fetch jobs' 
    });
  }
});

// Job application endpoint
app.post('/api/jobs/:jobId/apply', authenticateToken, async (req, res) => {
    try {
      const { jobId } = req.params;
      const { name, email, coverLetter } = req.body;
      
      // Validate required fields
      if (!name || !email || !coverLetter) {
        return res.status(400).json({
          status: 'error',
          message: 'Name, email and cover letter are required'
        });
      }

      const [result] = await pool.execute(
        'INSERT INTO applications (job_id, user_id, name, email, cover_letter) VALUES (?, ?, ?, ?, ?)',
        [jobId, req.user.id, name, email, coverLetter]
      );

      res.status(201).json({
        status: 'success',
        message: 'Application submitted successfully',
        data: {
          id: result.insertId,
          jobId,
          name,
          email,
        }
      });
    } catch (error) {
      console.error('Application submission error:', error);
    }
  }
);

// Save/unsave job endpoint
app.post('/api/jobs/:jobId/save', authenticateToken, async (req, res) => {
  try {
    const { jobId } = req.params;
    
    const [existing] = await pool.execute(
      'SELECT * FROM saved_jobs WHERE user_id = ? AND job_id = ?',
      [req.user.id, jobId]
    );
    
    if (existing.length > 0) {
      await pool.execute(
        'DELETE FROM saved_jobs WHERE user_id = ? AND job_id = ?',
        [req.user.id, jobId]
      );
      return res.json({
        status: 'success',
        message: 'Job removed from saved jobs'
      });
    } else {
      await pool.execute(
        'INSERT INTO saved_jobs (user_id, job_id) VALUES (?, ?)',
        [req.user.id, jobId]
      );
      return res.json({
        status: 'success',
        message: 'Job saved successfully'
      });
    }
  } catch (error) {
    console.error('Save/unsave job error:', error);
    res.status(500).json({ 
      status: 'error',
      message: 'Failed to save/unsave job' 
    });
  }
});
app.get('/api/saved-jobs', authenticateToken, async (req, res) => {
  try {
    const [savedJobs] = await pool.execute(
      'SELECT job_id FROM saved_jobs WHERE user_id = ?',
      [req.user.id]
    );
    res.json({
      status: 'success',
      data: savedJobs.map(job => job.job_id)
    });
  } catch (error) {
    console.error('Error fetching saved jobs:', error);
    res.status(500).json({ 
      status: 'error',
      message: 'Failed to fetch saved jobs' 
    });
  }
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    status: 'error',
    message: 'Something went wrong!' 
  });
});

// Start server after checking database connection
async function startServer() {
  const isConnected = await testConnection();
  if (isConnected) {
    app.listen(port, () => {
      console.log(`✅ Server is running on port ${port}`);
    });
  } else {
    console.error('❌ Server startup failed due to database connection error');
    process.exit(1);
  }
}


