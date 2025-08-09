import axios from 'axios';
import { toast } from 'react-toastify';

const axiosInstance = axios.create({
  baseURL: '/api', // This assumes your API is at /api on the same domain
});

// Request interceptor to add auth token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('userToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('userToken');
      toast.error('Session expired. Please login again.');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;