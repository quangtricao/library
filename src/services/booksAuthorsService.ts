import axios, { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { API_URL } from '../config/api';
import { BooksAuthorsRequest, BooksResponse } from '../types/book';

export const getBooksAuthors = createAsyncThunk<BooksResponse, BooksAuthorsRequest, { rejectValue: string }>(
  'booksAuthors/getBooksAuthors',
  async ({ authorId, pagination: { page = 1, limit = 8 } }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/authors/${authorId}/books?page=${page}&limit=${limit}`);
      return response.data;
    } catch (err) {
      const error = err as Error | AxiosError;
      return rejectWithValue(error.message);
    }
  }
);
