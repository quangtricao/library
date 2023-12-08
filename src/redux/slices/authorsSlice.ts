import { createSlice } from '@reduxjs/toolkit';

import { AuthorsState } from '../../types/author';
import { ERROR, IDLE, LOADING } from '../../types/status';
import { getAuthors } from '../../services/authorsService';

const initialState: AuthorsState = {
  authors: [],
  pagination: {
    page: 1,
    totalPages: 1,
  },
  status: IDLE,
  error: null,
};

const authorsSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAuthors.pending, (state) => {
      state.status = LOADING;
    });
    builder.addCase(getAuthors.fulfilled, (state, { payload }) => {
      state.authors = payload.data.authors;
      state.pagination = payload.data.pagination;
      state.status = payload.status;
    });
    builder.addCase(getAuthors.rejected, (state, action) => {
      if (action.payload) {
        state.status = ERROR;
        state.error = action.payload;
      }
    });
  },
});

export default authorsSlice.reducer;
