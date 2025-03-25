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
