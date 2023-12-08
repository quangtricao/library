import { createSlice } from '@reduxjs/toolkit';

import { BooksState } from '../../types/book';
import { ERROR, IDLE, LOADING } from '../../types/status';
import { getBooks } from '../../services/booksService';

const initialState: BooksState = {
  books: [],
  pagination: {
    page: 1,
    totalPages: 1,
  },
  status: IDLE,
  error: null,
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBooks.pending, (state) => {
      state.status = LOADING;
    });
    builder.addCase(getBooks.fulfilled, (state, { payload }) => {
      state.books = payload.data.books;
      state.pagination = payload.data.pagination;
      state.status = payload.status;
    });
    builder.addCase(getBooks.rejected, (state, action) => {
      if (action.payload) {
        state.status = ERROR;
        state.error = action.payload;
      }
    });
  },
});

export default booksSlice.reducer;
