import axios from 'axios';
import { store } from '../store/store';
import { logout } from '../store/features/auth/authSlice';
import { clearProfile } from '../store/features/user/userSlice';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Add request interceptor to include token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
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
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear everything on 401
      store.dispatch(logout());
      store.dispatch(clearProfile());
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance; 