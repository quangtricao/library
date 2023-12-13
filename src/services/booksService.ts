import axios, { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { API_URL } from '../config/api';
import { BooksResponse, SingleBookResponse, SingleBookRequest } from '../types/book';
import { PaginationRequestParams } from '../types/pagination';

export const getBooks = createAsyncThunk<BooksResponse, PaginationRequestParams, { rejectValue: string }>(
  'books/getBooks',
  async ({ page = 1, limit = 6 }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/books?page=${page}&limit=${limit}`);
      return response.data;
    } catch (err) {
      const error = err as Error | AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

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

export const updateSingleBook = createAsyncThunk<SingleBookResponse, SingleBookRequest, { rejectValue: string }>(
  'books/updateBooks',
  async (obj, { rejectWithValue }) => {
    try {
      const authors = obj.book.authors.map((author) => author._id);
      const genres = obj.book.genres.map((genre) => genre._id);
      const updatedBook = { ...obj.book, authors, genres };

      const response = await axios.put(`${API_URL}/books/${obj.book.isbn}`, updatedBook, {
        headers: {
          Authorization: `bearer ${obj.token}`,
        },
      });
      return response.data;
    } catch (err) {
      const error = err as Error | AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

export const deleteSingleBook = createAsyncThunk<void, SingleBookRequest, { rejectValue: string }>(
  'books/deleteBook',
  async (obj, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/books/${obj.book.isbn}`, {
        headers: {
          Authorization: `bearer ${obj.token}`,
        },
      });
    } catch (err) {
      const error = err as Error | AxiosError;
      return rejectWithValue(error.message);
    }
  }
);
