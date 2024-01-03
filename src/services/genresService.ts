import axios, { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { API_URL } from '../config/api';
import { GenresResponse } from '../types/genre';
import { PaginationRequestParams } from '../types/pagination';

export const getGenres = createAsyncThunk<GenresResponse, PaginationRequestParams, { rejectValue: string }>(
  'genres/getGenres',
  async ({ page = 1, limit = 3 }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/genres?page=${page}&limit=${limit}`);
      return response.data;
    } catch (err) {
      const error = err as Error | AxiosError;
      return rejectWithValue(error.message);
    }
  }
);
