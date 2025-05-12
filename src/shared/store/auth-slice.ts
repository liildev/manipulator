import type { LoginResponse } from '@/types/api';
import type { AuthState } from '@/types/auth';

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { KEYS, storage } from '@/shared/utils';

const initialState: AuthState = {
  user: storage.getItem(KEYS.user),
  isAuthenticated: storage.getItem(KEYS.isAuthenticated),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<LoginResponse>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      storage.setItem(KEYS.user, action.payload);
      storage.setItem(KEYS.isAuthenticated, true);
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem(KEYS.user);
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
