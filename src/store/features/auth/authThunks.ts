import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProfileSuccess, clearProfile } from '../user/userSlice';
import { isAxiosError } from 'axios';
import axiosInstance from '../../../utils/axios';

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupCredentials {
  name: string;
  username: string;
  email: string;
  password: string;
}

interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    username: string;
    createdAt: string;
    updatedAt: string;
  };
  access_token: string;
  refresh_token: string;
}

interface TokenResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    email: string;
    name: string;
    username: string;
    createdAt: string;
    updatedAt: string;
  };
}

let isRefreshing = false;

export const signup = createAsyncThunk(
  'auth/signup',
  async (credentials: SignupCredentials, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<AuthResponse>('/signup', credentials);
      
      // Store tokens
      localStorage.setItem('accessToken', response.data.access_token);
      localStorage.setItem('refreshToken', response.data.refresh_token);
      
      // Update user profile in the user slice
      dispatch(fetchProfileSuccess(response.data.user));
      
      return response.data;
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response?.data) {
        return rejectWithValue(error.response.data.error || 'Failed to create account');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<AuthResponse>('/login', credentials);
      
      // Store tokens
      localStorage.setItem('accessToken', response.data.access_token);
      localStorage.setItem('refreshToken', response.data.refresh_token);
      
      // Update user profile in the user slice
      dispatch(fetchProfileSuccess(response.data.user));
      
      return response.data;
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response?.data) {
        return rejectWithValue(error.response.data.message || 'Login failed');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const checkAuth = createAsyncThunk(
  'auth/check',
  async (_, { dispatch, rejectWithValue }) => {
    if (isRefreshing) {
      return rejectWithValue('Refresh already in progress');
    }

    const refresh_token = localStorage.getItem('refreshToken');
    if (!refresh_token) {
      return rejectWithValue('No refresh token found');
    }

    try {
      isRefreshing = true;
      console.log('Refreshing token...');
      const response = await axiosInstance.post<TokenResponse>(
        '/refresh-token',
        { refresh_token }
      );
      
      console.log('Refresh response:', response.data);
      
      // Store both tokens
      localStorage.setItem('accessToken', response.data.access_token);
      localStorage.setItem('refreshToken', response.data.refresh_token);
      
      // Make sure to update the user profile in the store
      dispatch(fetchProfileSuccess(response.data.user));
      
      return response.data;
    } catch (error: unknown) {
      console.error('Refresh token error:', error);
      // Clear everything on refresh token failure
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      dispatch(clearProfile());
      if (isAxiosError(error) && error.response?.data) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue('Failed to refresh authentication');
    } finally {
      isRefreshing = false;
    }
  }
); 