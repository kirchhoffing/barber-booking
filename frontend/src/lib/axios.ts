// /src/lib/axios.ts

import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000', // Backend port'u
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor - her istekte token'ı ekle
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - 401 hatalarında login sayfasına yönlendir
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Response error:', error);
    
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default instance
