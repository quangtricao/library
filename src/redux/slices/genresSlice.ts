import axios, { AxiosError } from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { API_URL } from '../../config/api';
import { StatusType } from '../../types/status';
import { GenresResponse, GenreType } from '../../types/genre';
import { PaginationResponse, PaginationRequestParams } from '../../types/pagination';

/**
 * TO DO
 */
export const getGenres = createAsyncThunk<
  GenresResponse,
  PaginationRequestParams,
  { rejectValue: string }
>('genres/getGenres', async ({ page = 1, limit = 3 }, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/genres?page=${page}&limit=${limit}`);
    return response.data;
  } catch (err) {
    const error = err as Error | AxiosError;
    return rejectWithValue(error.message);
  }
});

/**
 * @param page A page type number
 * @example getAndPushGenres(2)
 */
export const getAndPushGenres = createAsyncThunk<
  GenresResponse,
  PaginationRequestParams,
  { rejectValue: string }
>('genres/getAndPushGenres', async ({ page, limit = 3 }, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/genres?page=${page}&limit=${limit}`);
    return response.data;
  } catch (err) {
    const error = err as Error | AxiosError;
    return rejectWithValue(error.message);
  }
});

type initialStateType = {
  genres: GenreType[];
  pagination: PaginationResponse;
  status: StatusType;
  error: string | null;
};

const initialState: initialStateType = {
  genres: [],
  pagination: {
    page: 1,
    totalPages: 1,
  },
  status: 'idle',
  error: null,
};

const genresSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGenres.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getGenres.fulfilled, (state, { payload }) => {
      state.genres = payload.data.genres;
      state.pagination = payload.data.pagination;
      state.status = payload.status;
    });
    builder.addCase(getGenres.rejected, (state, action) => {
      if (action.payload) {
        state.status = 'error';
        state.error = action.payload;
      }
    });
    builder.addCase(getAndPushGenres.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getAndPushGenres.fulfilled, (state, { payload }) => {
      state.genres.push(...payload.data.genres);
      state.pagination = payload.data.pagination;
      state.status = payload.status;
    });
    builder.addCase(getAndPushGenres.rejected, (state, action) => {
      if (action.payload) {
        state.status = 'error';
        state.error = action.payload;
      }
    });
  },
});

export default genresSlice.reducer;
