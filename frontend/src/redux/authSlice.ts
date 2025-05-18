import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  error: null,
};

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

interface SignInFormData {
  email: string;
  password: string;
}

export const signUp = createAsyncThunk<
  { user: User; token: string },
  SignUpFormData,
  { rejectValue: string }
>(
  'auth/signUp',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8080/auth/signup', formData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Sign-up failed');
    }
  }
);

export const signIn = createAsyncThunk<
  { user: User; token: string },
  SignInFormData,
  { rejectValue: string }
>(
  'auth/signIn',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8080/auth/login', formData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Sign-in failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        state.isAuthenticated = true;
      })
      .addCase(signUp.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'Sign-up failed';
      })
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        state.isAuthenticated = true;
      })
      .addCase(signIn.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'Sign-in failed';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;