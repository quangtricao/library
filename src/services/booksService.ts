import axios, { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { API_URL } from '../config/api';
import { BooksResponse, SingleBookResponse, BookType } from '../types/book';
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

export const getSingleBook = createAsyncThunk<SingleBookResponse, string, { rejectValue: string }>(
  'books/getSingleBook',
  async (isbn, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/books/${isbn}`);
      return response.data;
    } catch (err) {
      const error = err as Error | AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

export const updateBook = createAsyncThunk<SingleBookResponse, BookType, { rejectValue: string }>(
  'books/updateBooks',
  async (newBook, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/books`, newBook);
      return response.data;
    } catch (err) {
      const error = err as Error | AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

export const deleteBook = createAsyncThunk<void, string, { rejectValue: string }>(
  'books/deleteBook',
  async (isbn, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/books/${isbn}`);
    } catch (err) {
      const error = err as Error | AxiosError;
      return rejectWithValue(error.message);
    }
  }
);
