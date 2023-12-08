import axios, { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { API_URL } from '../config/api';
import { BooksResponse, BooksGenresRequest } from '../types/book';

export const getBooksGenres = createAsyncThunk<
  BooksResponse,
  BooksGenresRequest,
  { rejectValue: string }
>(
  'booksGenres/getBooksGenres',
  async ({ authorId, pagination: { page = 1, limit = 6 } }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/genres/${authorId}/books?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (err) {
      const error = err as Error | AxiosError;
      return rejectWithValue(error.message);
    }
  }
);
