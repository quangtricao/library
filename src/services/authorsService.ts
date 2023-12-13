import axios, { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { API_URL } from '../config/api';
import { AuthorsResponse, SingleAuthorResponse } from '../types/author';
import { PaginationRequestParams } from '../types/pagination';

export const getAuthors = createAsyncThunk<AuthorsResponse, PaginationRequestParams, { rejectValue: string }>(
  'authors/getAuthors',
  async ({ page = 1, limit }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/authors?page=${page}&limit=${limit}`);
      return response.data;
    } catch (err) {
      const error = err as Error | AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

export const getSingleAuthor = createAsyncThunk<SingleAuthorResponse, string, { rejectValue: string }>(
  'authors/getSingleAuthor',
  async (authorId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/authors/${authorId}`);
      return response.data;
    } catch (err) {
      const error = err as Error | AxiosError;
      return rejectWithValue(error.message);
    }
  }
);
