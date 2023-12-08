import { configureStore } from '@reduxjs/toolkit';

import booksReducer from './slices/booksSlice';
import genresReducer from './slices/genresSlice';
import cartReducer from './slices/cartSlice';
import authorsReducer from './slices/authorsSlice';
import accountReducer from './slices/accountSlice';
import booksAuthorsReducer from './slices/booksAuthorsSlice';
import booksGenresReducer from './slices/booksGenresSlice';

import { IDLE } from '../types/status';
import { AccountState } from '../types/account';
import { getAccountFromLocalStorage, saveAccountToLocalStorage } from '../utils/localStorage';

const preLoadedAccountReducer: AccountState = {
  account: getAccountFromLocalStorage(),
  status: IDLE,
  error: null,
};

const updateLocalStorage = () => {
  const updatedAccount = store.getState().account.account;
  saveAccountToLocalStorage(updatedAccount);
};

export const createStore = () =>
  configureStore({
    reducer: {
      books: booksReducer,
      booksAuthors: booksAuthorsReducer,
      booksGenres: booksGenresReducer,
      genres: genresReducer,
      cart: cartReducer,
      authors: authorsReducer,
      account: accountReducer,
    },
    preloadedState: {
      account: preLoadedAccountReducer,
    },
  });

const store = createStore();
store.subscribe(updateLocalStorage);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
