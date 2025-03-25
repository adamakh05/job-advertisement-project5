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
