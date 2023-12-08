import { createSlice } from '@reduxjs/toolkit';

import { AccountState } from '../../types/account';
import { ERROR, IDLE, LOADING } from '../../types/status';
import { getProfile } from '../../services/accountService';

const initialState: AccountState = {
  account: null,
  status: IDLE,
  error: null,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProfile.pending, (state) => {
      state.status = LOADING;
    });
    builder.addCase(getProfile.fulfilled, (state, { payload }) => {
      state.account = payload.data;
      state.status = payload.status;
    });
    builder.addCase(getProfile.rejected, (state, action) => {
      if (action.payload) {
        state.status = ERROR;
        state.error = action.payload;
      }
    });
  },
});

export default accountSlice.reducer;
