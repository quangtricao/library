import axios, { AxiosError } from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { API_URL } from '../../config/api';
import { StatusType } from '../../types/status';
import { BooksResponse, BookType } from '../../types/book';
import { PaginationResponse, PaginationRequestParams } from '../../types/pagination';

export const fetchBooks = createAsyncThunk<
  BooksResponse,
  PaginationRequestParams,
  { rejectValue: string }
>('books/fetchBooks', async ({ page = 1, limit = 6 }, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/books?page=${page}&limit=${limit}`);
    return response.data;
  } catch (err) {
    const error = err as Error | AxiosError;
    return rejectWithValue(error.message);
  }
});

type initialStateType = {
  books: BookType[];
  pagination: PaginationResponse;
  status: StatusType;
  error: string | null;
};

const initialState: initialStateType = {
  books: [],
  pagination: {
    page: 1,
    totalPages: 1,
  },
  status: 'idle',
  error: null,
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchBooks.fulfilled, (state, { payload }) => {
      state.books = payload.data.books;
      state.pagination = payload.data.pagination;
      state.status = payload.status;
    });
    builder.addCase(fetchBooks.rejected, (state, action) => {
      if (action.payload) {
        state.status = 'error';
        state.error = action.payload;
      }
    });
  },
});

export default booksSlice.reducer;
