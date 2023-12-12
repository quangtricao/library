import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { AccountState } from '../../types/account';
import { ERROR, IDLE, LOADING } from '../../types/status';
import { getProfile } from '../../services/accountService';
import { BookType } from '../../types/book';

const initialState: AccountState = {
  account: null,
  status: IDLE,
  error: null,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    addBookToAccountSlice(state, action: PayloadAction<BookType>) {
      if (state.account?.borrowedBooks) {
        state.account.borrowedBooks.push(action.payload);
      }
    },
    removeBookFromAccountSlice(state, action: PayloadAction<string>) {
      if (state.account?.borrowedBooks) {
        state.account.borrowedBooks = state.account.borrowedBooks.filter((book) => book._id !== action.payload);
      }
    },
    clearAccount(state) {
      state.account = null;
    },
  },
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

export const { addBookToAccountSlice, removeBookFromAccountSlice, clearAccount } = accountSlice.actions;
export default accountSlice.reducer;
