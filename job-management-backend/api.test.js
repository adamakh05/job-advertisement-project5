const request = require('supertest');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { app } = require('./server');


jest.mock('mysql2/promise', () => {
  const mockExecute = jest.fn();
  const mockConnection = {
    execute: mockExecute,
    release: jest.fn(),
    beginTransaction: jest.fn(),
    commit: jest.fn(),
    rollback: jest.fn()
  };
  return {
    createPool: jest.fn().mockReturnValue({
      getConnection: jest.fn().mockResolvedValue(mockConnection),
      execute: mockExecute
    })
  };
});


const mysql = require('mysql2/promise');
const mockPool = mysql.createPool();

describe('Job Portal API Tests', () => {
  beforeEach(() => {
    
    jest.clearAllMocks();
  });
  
  describe('Authentication Endpoints', () => {
    test('POST /auth/register - should register a new user', async () => {
      
      mockPool.execute
        .mockResolvedValueOnce([[], null]) 
        .mockResolvedValueOnce([{ insertId: 1 }]) 
        .mockResolvedValueOnce([[{ id: 1, email: 'test@example.com', username: 'testuser', dob: '1990-01-01' }]]); 
      
      const response = await request(app)
        .post('/auth/register')
        .send({
          email: 'test@example.com',
          password: 'password123',
          username: 'testuser',
          dob: '1990-01-01'
        });
      
      expect(response.status).toBe(201);
      expect(response.body.status).toBe('success');
      expect(response.body.data.user).toBeDefined();
      expect(response.body.data.token).toBeDefined();
    });
    
    test('POST /auth/login - should login a user', async () => {
      
      const hashedPassword = await bcrypt.hash('password123', 10);
      mockPool.execute.mockResolvedValueOnce([[{
        id: 1,
        email: 'test@example.com',
        username: 'testuser',
        password: hashedPassword,
        dob: '1990-01-01',
        role: 'user'
      }]]);
      
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });
      
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.user).toBeDefined();
      expect(response.body.data.token).toBeDefined();
    });
    
    test('POST /auth/admin/login - should login an admin', async () => {
      
      const hashedPassword = await bcrypt.hash('adminpassword', 10);
      mockPool.execute.mockResolvedValueOnce([[{
        id: 1,
        email: 'admin@example.com',
        username: 'admin',
        password: hashedPassword,
        dob: '1990-01-01',
        role: 'admin'
      }]]);
      
      const response = await request(app)
        .post('/auth/admin/login')
        .send({
          email: 'admin@example.com',
          password: 'adminpassword'
        });
      
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.user.role).toBe('admin');
      expect(response.body.data.token).toBeDefined();
    });
  });
  
  describe('Job Endpoints', () => {
    test('GET /api/jobs - should return jobs with filters', async () => {
      
      mockPool.execute.mockResolvedValueOnce([[
        { id: 1, title: 'Software Engineer', company: 'Tech Co', location: 'New York' },
        { id: 2, title: 'Web Developer', company: 'Web Co', location: 'San Francisco' }
      ]]);
      
      const response = await request(app)
        .get('/api/jobs')
        .query({
          search: 'developer',
          type: 'full-time',
          location: 'san',
          skills: 'javascript,react'
        });
      
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data).toHaveLength(2);
    });
    
    test('GET /api/jobs/:job_id - should return a specific job', async () => {
      
      mockPool.execute.mockResolvedValueOnce([[
        { id: 1, title: 'Software Engineer', company: 'Tech Co', location: 'New York' }
      ]]);
      
      const response = await request(app)
        .get('/api/jobs/1');
      
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.id).toBe(1);
      expect(response.body.data.title).toBe('Software Engineer');
    });
    
    test('POST /api/jobs - should create a new job', async () => {
      
      const token = jwt.sign({ id: 1, email: 'test@example.com' }, process.env.JWT_SECRET || '121212asasadqweqe1231');
      
      
      mockPool.execute.mockResolvedValueOnce([{ insertId: 1 }]);
      
      const jobData = {
        title: 'Software Engineer',
        company: 'Tech Co',
        location: 'New York',
        type: 'full-time',
        skills: 'javascript,react',
        salary: '100000',
        description: 'Job description',
        requirements: 'Job requirements'
      };
      
      const response = await request(app)
        .post('/api/jobs')
        .set('Authorization', `Bearer ${token}`)
        .send(jobData);
      
      expect(response.status).toBe(201);
      expect(response.body.status).toBe('success');
      expect(response.body.data.id).toBe(1);
      expect(response.body.data.title).toBe(jobData.title);
    });
  });
  
  describe('Admin Endpoints', () => {
    let adminToken;
    
    beforeEach(() => {
      
      adminToken = jwt.sign(
        { id: 1, email: 'admin@example.com', role: 'admin' },
        process.env.JWT_SECRET || '121212asasadqweqe1231'
      );
    });
    
    test('GET /admin/dashboard/stats - should return dashboard stats', async () => {
      
      mockPool.execute
        .mockResolvedValueOnce([[{ totalJobs: 10 }]])
        .mockResolvedValueOnce([[{ totalUsers: 20 }]])
        .mockResolvedValueOnce([[{ totalApplications: 30 }]])
        .mockResolvedValueOnce([[{ pendingApplications: 15 }]]);
      
      const response = await request(app)
        .get('/admin/dashboard/stats')
        .set('Authorization', `Bearer ${adminToken}`);
      
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.totalJobs).toBe(10);
      expect(response.body.data.totalUsers).toBe(20);
      expect(response.body.data.totalApplications).toBe(30);
      expect(response.body.data.pendingApplications).toBe(15);
    });
    
  
  });
});
