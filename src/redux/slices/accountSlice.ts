import axios, { AxiosError } from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { API_URL } from '../../config/api';
import { ERROR, IDLE, LOADING, StatusType } from '../../types/status';
import {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
} from '../../types/authentication';
import { AccountType, AccountResponse } from '../../types/account';

export const login = createAsyncThunk(
  'account/login',
  async (obj: LoginRequest): Promise<LoginResponse | string> => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, obj);
      return response.data;
    } catch (err) {
      const error = err as Error | AxiosError;
      return error.message;
    }
  }
);

export const signup = createAsyncThunk(
  'account/signup',
  async (obj: SignupRequest): Promise<SignupResponse | string> => {
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, obj);
      return response.data;
    } catch (err) {
      const error = err as Error | AxiosError;
      return error.message;
    }
  }
);

export const getProfile = createAsyncThunk<AccountResponse, string, { rejectValue: string }>(
  'account/getProfile',
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      const error = err as Error | AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

export type initialStateType = {
  account: AccountType | null;
  status: StatusType;
  error: string | null;
};

const initialState: initialStateType = {
  account: null,
  status: IDLE,
  error: null,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProfile.pending, (state) => {
      state.status = LOADING;
    });
    builder.addCase(getProfile.fulfilled, (state, { payload }) => {
      state.account = payload.data;
      state.status = payload.status;
    });
    builder.addCase(getProfile.rejected, (state, action) => {
      if (action.payload) {
        state.status = ERROR;
        state.error = action.payload;
      }
    });
  },
});

export default accountSlice.reducer;
