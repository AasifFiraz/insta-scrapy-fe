import { createSlice } from '@reduxjs/toolkit';
import { signup, login, checkAuth } from './authThunks';

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  authChecked: boolean;
  error: string | null;
  token: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  loading: false,
  authChecked: false,
  error: null,
  token: localStorage.getItem('accessToken'),
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.error = null;
      state.authChecked = true;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Signup
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.loading = false;
        state.authChecked = true;
        state.token = action.payload.access_token;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.authChecked = true;
        state.error = action.payload as string;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.loading = false;
        state.authChecked = true;
        state.token = action.payload.access_token;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.authChecked = true;
        state.error = action.payload as string;
      })
      // Check Auth
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        console.log('Auth state updated:', action.payload);
        state.isAuthenticated = true;
        state.loading = false;
        state.authChecked = true;
        state.token = action.payload.access_token;
        state.error = null;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.loading = false;
        state.authChecked = true;
        if (action.payload !== 'Refresh already in progress') {
          state.isAuthenticated = false;
          state.token = null;
          state.error = action.payload as string;
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        }
      });
  },
});

export const { logout, clearError } = authSlice.actions;

export default authSlice.reducer; 