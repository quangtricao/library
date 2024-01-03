import { configureStore } from '@reduxjs/toolkit';

import booksReducer from './slices/booksSlice';
import genresReducer from './slices/genresSlice';
import cartReducer from './slices/cartSlice';
import filterReducer from './slices/filterSlice'
import authorsReducer from './slices/authorsSlice';
import accountReducer from './slices/accountSlice';
import booksAuthorsReducer from './slices/booksAuthorsSlice';
import booksGenresReducer from './slices/booksGenresSlice';
import notificationReducer from './slices/notificationSlice';

import { IDLE } from '../types/status';
import { AccountState } from '../types/account';
import {
  getAccountFromLocalStorage,
  getBorrowBookInCartFromLocalStorage,
  getReturnBookInCartFromLocalStorage,
  saveAccountToLocalStorage,
  saveBorrowBookInCartToLocalStorage,
  saveReturnBookInCartToLocalStorage,
} from '../utils/localStorage';
import { CartState } from '../types/cart';

const preLoadedAccountReducer: AccountState = {
  account: getAccountFromLocalStorage(),
  status: IDLE,
  error: null,
};

const preLoadedCartReducer: CartState = {
  booksToBorrow: getBorrowBookInCartFromLocalStorage(),
  booksToReturn: getReturnBookInCartFromLocalStorage(),
};

const updateLocalStorage = () => {
  const updatedAccount = store.getState().account.account;
  const updatedBorrowBooksInCart = store.getState().cart.booksToBorrow;
  const updatedReturnBooksInCart = store.getState().cart.booksToReturn;
  saveBorrowBookInCartToLocalStorage(updatedBorrowBooksInCart);
  saveReturnBookInCartToLocalStorage(updatedReturnBooksInCart);
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
      filter: filterReducer,
      authors: authorsReducer,
      account: accountReducer,
      notification: notificationReducer,
    },
    preloadedState: {
      account: preLoadedAccountReducer,
      cart: preLoadedCartReducer,
    },
  });

const store = createStore();
store.subscribe(updateLocalStorage);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
