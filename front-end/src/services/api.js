// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Set token header for user requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// User Authentication and Profile services
export const authService = {
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
  },
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

export const userService = {
  uploadCV: async (formData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.post('/user/upload-cv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token ? `Bearer ${token}` : '',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Upload CV failed' };
    }
  },
  removeCV: async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.delete('/user/remove-cv', {
        headers: { Authorization: token ? `Bearer ${token}` : '' },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Remove CV failed' };
    }
  },
  getProfile: async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get('/api/user/profile', {
        headers: { Authorization: token ? `Bearer ${token}` : '' },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Get profile failed' };
    }
  },
  updateProfile: async (updatedData) => {
    try {
      const token = localStorage.getItem('token');
      // Assumes your backend update endpoint is a PUT request at '/api/user/profile'
      const response = await api.put('/api/user/profile', updatedData, {
        headers: { Authorization: token ? `Bearer ${token}` : '' },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Profile update failed' };
    }
  },
};

// Admin Authentication and Management services
export const adminAuthService = {
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/admin/login', {
        email,
        password,
      });
      if (response.data.token) {
        localStorage.setItem('adminToken', response.data.token);
        localStorage.setItem('adminUser', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Admin login failed' };
    }
  },
  logout: () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
  },
};

export const adminService = {
  getAllJobs: async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await api.get('/admin/jobs', {
        headers: { Authorization: token ? `Bearer ${token}` : '' },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Get jobs failed' };
    }
  },
  deleteJob: async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await api.delete(`/admin/jobs/${id}`, {
        headers: { Authorization: token ? `Bearer ${token}` : '' },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Delete job failed' };
    }
  },
  getAllUsers: async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await api.get('/admin/users', {
        headers: { Authorization: token ? `Bearer ${token}` : '' },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Get users failed' };
    }
  },
  deleteUser: async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await api.delete(`/admin/users/${id}`, {
        headers: { Authorization: token ? `Bearer ${token}` : '' },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Delete user failed' };
    }
  },
  getDashboardStats: async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await api.get('/admin/dashboard/stats', {
        headers: { Authorization: token ? `Bearer ${token}` : '' },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Get dashboard stats failed' };
    }
  },
};

export const jobService = {
  getAllJobs: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters.search) queryParams.append('search', filters.search);
      if (filters.type) queryParams.append('type', filters.type);
      if (filters.location) queryParams.append('location', filters.location);
      if (filters.skills) queryParams.append('skills', filters.skills);
      
      const response = await api.get(`/api/jobs?${queryParams.toString()}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Get jobs failed' };
    }
  },
  
  getJobById: async (id) => {
    try {
      const response = await api.get(`/api/jobs/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Get job failed' };
    }
  },
  
  applyForJob: async (jobId, applicationData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.post(
        `/api/jobs/${jobId}/apply`,
        applicationData,
        {
          headers: { Authorization: token ? `Bearer ${token}` : '' },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Job application failed' };
    }
  },
  
  saveJob: async (jobId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.post(
        `/api/jobs/${jobId}/save`,
        {},
        {
          headers: { Authorization: token ? `Bearer ${token}` : '' },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Save job failed' };
    }
  },
  
  getSavedJobs: async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get('/api/saved-jobs', {
        headers: { Authorization: token ? `Bearer ${token}` : '' },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Get saved jobs failed' };
    }
  },
  
  getUserApplications: async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get('/api/user/applications', {
        headers: { Authorization: token ? `Bearer ${token}` : '' },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Get applications failed' };
    }
  },
  
  postJob: async (jobData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.post('/api/jobs', jobData, {
        headers: { Authorization: token ? `Bearer ${token}` : '' },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Post job failed' };
    }
  }
};

export default api;

