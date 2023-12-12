import { createSlice } from '@reduxjs/toolkit';

import { BooksGenresState } from '../../types/booksGenres';
import { ERROR, IDLE, LOADING } from '../../types/status';
import { getBooksGenres } from '../../services/booksGenresSlice';

const initialState: BooksGenresState = {
  books: [],
  pagination: {
    page: 1,
    totalPages: 1,
  },
  status: IDLE,
  error: null,
};

const booksSlice = createSlice({
  name: 'booksGenres',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBooksGenres.pending, (state) => {
      state.status = LOADING;
    });
    builder.addCase(getBooksGenres.fulfilled, (state, { payload }) => {
      state.books = payload.data.books;
      state.pagination = payload.data.pagination;
      state.status = payload.status;
    });
    builder.addCase(getBooksGenres.rejected, (state, action) => {
      if (action.payload) {
        state.status = ERROR;
        state.error = action.payload;
      }
    });
  },
});

export default booksSlice.reducer;
