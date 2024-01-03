import { createSlice } from '@reduxjs/toolkit';

import { GenresState } from '../../types/genre';
import { ERROR, IDLE, LOADING } from '../../types/status';
import { getGenres } from '../../services/genresService';

const initialState: GenresState = {
  genres: [],
  pagination: {
    page: 1,
    totalPages: 1,
  },
  status: IDLE,
  error: null,
};

const genresSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGenres.pending, (state) => {
      state.status = LOADING;
    });
    builder.addCase(getGenres.fulfilled, (state, { payload }) => {
      state.genres = payload.data.genres;
      state.pagination = payload.data.pagination;
      state.status = payload.status;
    });
    builder.addCase(getGenres.rejected, (state, action) => {
      if (action.payload) {
        state.status = ERROR;
        state.error = action.payload;
      }
    });
  },
});

export default genresSlice.reducer;
