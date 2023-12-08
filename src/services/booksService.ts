import axios, { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { API_URL } from '../config/api';
import { BooksResponse } from '../types/book';
import { PaginationRequestParams } from '../types/pagination';

export const getBooks = createAsyncThunk<
  BooksResponse,
  PaginationRequestParams,
  { rejectValue: string }
>('books/getBooks', async ({ page = 1, limit = 6 }, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/books?page=${page}&limit=${limit}`);
    return response.data;
  } catch (err) {
    const error = err as Error | AxiosError;
    return rejectWithValue(error.message);
  }
});
