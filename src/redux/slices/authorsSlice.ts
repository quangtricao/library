import axios, { AxiosError } from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { API_URL } from '../../config/api';
import { ERROR, IDLE, LOADING, StatusType } from '../../types/status';
import { AuthorsResponse, AuthorType } from '../../types/author';
import { PaginationResponse, PaginationRequestParams } from '../../types/pagination';

export const getAuthors = createAsyncThunk<
  AuthorsResponse,
  PaginationRequestParams,
  { rejectValue: string }
>('authors/getAuthors', async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/authors?page=${page}&limit=${limit}`);
    return response.data;
  } catch (err) {
    const error = err as Error | AxiosError;
    return rejectWithValue(error.message);
  }
});

type initialStateType = {
  authors: AuthorType[];
  pagination: PaginationResponse;
  status: StatusType;
  error: string | null;
};

const initialState: initialStateType = {
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
