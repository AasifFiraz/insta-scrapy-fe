import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { signup, login, checkAuth } from '../auth/authThunks';

interface UserProfile {
  id: string;
  email: string;
  name: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

interface UserState {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  profile: null,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchProfileStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProfileSuccess: (state, action: PayloadAction<UserProfile>) => {
      console.log('Setting user profile:', action.payload);
      state.profile = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchProfileFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateProfileStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateProfileSuccess: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateProfileFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearProfile: (state) => {
      console.log('Clearing user profile');
      state.profile = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle signup success
      .addCase(signup.fulfilled, (state, action) => {
        console.log('Signup success - setting profile:', action.payload.user);
        state.profile = action.payload.user;
        state.loading = false;
        state.error = null;
      })
      // Handle login success
      .addCase(login.fulfilled, (state, action) => {
        console.log('Login success - setting profile:', action.payload.user);
        state.profile = action.payload.user;
        state.loading = false;
        state.error = null;
      })
      // Handle check auth success
      .addCase(checkAuth.fulfilled, (state, action) => {
        console.log('Check auth success - setting profile:', action.payload.user);
        state.profile = action.payload.user;
        state.loading = false;
        state.error = null;
      });
  },
});

export const {
  fetchProfileStart,
  fetchProfileSuccess,
  fetchProfileFailure,
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailure,
  clearProfile,
} = userSlice.actions;

export default userSlice.reducer; 