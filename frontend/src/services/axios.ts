import axios from 'axios';

// Base URL'i ayarla
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Request interceptor
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default axios; 