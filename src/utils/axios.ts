import axios, { AxiosError, InternalAxiosRequestConfig, AxiosRequestConfig } from 'axios';
import { store } from '../store/store';
import { logout } from '../store/features/auth/authSlice';
import { clearProfile } from '../store/features/user/userSlice';

const BASE_URL = process.env.NODE_ENV === "production" ? "https://postlyze.com/api" : "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL
});

// Create a flag to prevent multiple refresh token requests
let isRefreshing = false;

interface QueueItem {
  resolve: (token: string) => void;
  reject: (error: Error) => void;
}

let failedQueue: QueueItem[] = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach(promise => {
    if (error) {
      promise.reject(error);
    } else if (token) {
      promise.resolve(token);
    }
  });
  failedQueue = [];
};

// Add request interceptor to include token
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
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

// Response interceptor with token refresh logic
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    
    // If there's no config or it's already been retried, reject
    if (!originalRequest || (originalRequest as AxiosRequestConfig & { _retry?: boolean })._retry) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && originalRequest.url !== '/refresh-token') {
      if (isRefreshing) {
        // If refreshing, queue the request
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }

      (originalRequest as AxiosRequestConfig & { _retry?: boolean })._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const response = await axios.post(`${axiosInstance.defaults.baseURL}/refresh-token`, {
          refresh_token: refreshToken
        });

        const { access_token, refresh_token } = response.data;
        
        localStorage.setItem('accessToken', access_token);
        localStorage.setItem('refreshToken', refresh_token);

        // Update authorization header
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        originalRequest.headers.Authorization = `Bearer ${access_token}`;


        // Process queued requests
        processQueue(null, access_token);
        
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        const error = refreshError instanceof Error ? refreshError : new Error('Failed to refresh token');
        processQueue(error, null);
        // Clear everything on refresh token failure
        store.dispatch(logout());
        store.dispatch(clearProfile());
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    // If error is not 401 or is from refresh token endpoint
    if (error.response?.status === 401) {
      store.dispatch(logout());
      store.dispatch(clearProfile());
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
    
    return Promise.reject(error);
  }
);

// Export BASE_URL for reference if needed
export { BASE_URL };
export default axiosInstance; 