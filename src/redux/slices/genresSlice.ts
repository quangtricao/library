import axios, { AxiosError } from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { API_URL } from '../../config/api';
import { StatusType } from '../../types/status';
import { GenresResponse, GenreType } from '../../types/genre';
import { PaginationResponse, PaginationRequestParams } from '../../types/pagination';

export const fetchGenres = createAsyncThunk<
  GenresResponse,
  PaginationRequestParams,
  { rejectValue: string }
>('genres/fetchgenres', async (paginationObj, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `${API_URL}/genres?page=${paginationObj.page}&limit=${paginationObj.limit}`
    );
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
    builder.addCase(fetchGenres.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchGenres.fulfilled, (state, { payload }) => {
      state.genres = payload.data.genre;
      state.pagination = payload.data.pagination;
      state.status = payload.status;
    });
    builder.addCase(fetchGenres.rejected, (state, action) => {
      if (action.payload) {
        state.status = 'error';
        state.error = action.payload;
      }
    });
  },
});

export default genresSlice.reducer;
