import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { BooksState } from '../../types/book';
import { ERROR, IDLE, LOADING } from '../../types/status';
import { getBooks, updateSingleBook } from '../../services/booksService';

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
  reducers: {
    changeBookStatusToBorrowed(state, action: PayloadAction<string>) {
      state.books = state.books.map((book) => (book._id === action.payload ? { ...book, status: 'borrowed' } : book));
    },
    changeBookStatusToAvailable(state, action: PayloadAction<string>) {
      state.books = state.books.map((book) => (book._id === action.payload ? { ...book, status: 'available' } : book));
    },
  },
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
    builder.addCase(updateSingleBook.pending, (state) => {
      state.status = LOADING;
    });
    builder.addCase(updateSingleBook.fulfilled, (state, { payload }) => {
      state.books = state.books.map((book) => (book._id === payload.data._id ? payload.data : book));
      state.status = payload.status;
    });
    builder.addCase(updateSingleBook.rejected, (state, action) => {
      if (action.payload) {
        state.status = ERROR;
        state.error = action.payload;
      }
    });
  },
});

export const { changeBookStatusToBorrowed, changeBookStatusToAvailable } = booksSlice.actions;
export default booksSlice.reducer;
