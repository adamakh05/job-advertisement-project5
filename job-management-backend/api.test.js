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
