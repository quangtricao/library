import axios, { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { API_URL } from '../config/api';
import {
  AccountResponse,
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
} from '../types/account';

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
