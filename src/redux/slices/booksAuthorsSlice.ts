import { createSlice } from '@reduxjs/toolkit';

import { BooksAuthorsState } from '../../types/booksAuthors';
import { ERROR, IDLE, LOADING } from '../../types/status';
import { getBooksAuthors } from '../../services/booksAuthorsService';

const initialState: BooksAuthorsState = {
  books: [],
  pagination: {
    page: 1,
    totalPages: 1,
  },
  status: IDLE,
  error: null,
};

const booksAuthorsSlice = createSlice({
  name: 'booksAuthors',
  initialState,
  reducers: {
    clearBooksAuthors(state) {
      state.books = [];
    },
  },
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

export const { clearBooksAuthors } = booksAuthorsSlice.actions;
export default booksAuthorsSlice.reducer;
