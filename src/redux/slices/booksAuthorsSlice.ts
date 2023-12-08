import axios, { AxiosError } from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { API_URL } from '../../config/api';
import { ERROR, IDLE, LOADING, StatusType } from '../../types/status';
import { BooksResponse, BookType, BooksAuthorsRequest } from '../../types/book';
import { PaginationResponse } from '../../types/pagination';

export const getBooksAuthors = createAsyncThunk<
  BooksResponse,
  BooksAuthorsRequest,
  { rejectValue: string }
>(
  'booksAuthors/getBooksAuthors',
  async ({ authorId, pagination: { page = 1, limit = 6 } }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/authors/${authorId}/books?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (err) {
      const error = err as Error | AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

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
  status: IDLE,
  error: null,
};

const booksSlice = createSlice({
  name: 'booksAuthors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBooksAuthors.pending, (state) => {
      state.status = LOADING;
    });
    builder.addCase(getBooksAuthors.fulfilled, (state, { payload }) => {
      state.books = payload.data.books;
      state.pagination = payload.data.pagination;
      state.status = payload.status;
    });
    builder.addCase(getBooksAuthors.rejected, (state, action) => {
      if (action.payload) {
        state.status = ERROR;
        state.error = action.payload;
      }
    });
  },
});

export default booksSlice.reducer;