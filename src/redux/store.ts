import { configureStore } from '@reduxjs/toolkit';

import booksReducer from './slices/booksSlice';
import genresReducer from './slices/genresSlice';
import cartReducer from './slices/cartSlice';
import authorsReducer from './slices/authorsSlice';
import userReducer from './slices/userSlice';
import booksAuthorsReducer from './slices/booksAuthorsSlice';
import booksGenresReducer from './slices/booksGenresSlice';

export const initializaStore = () =>
  configureStore({
    reducer: {
      books: booksReducer,
      booksAuthors: booksAuthorsReducer,
      booksGenres: booksGenresReducer,
      genres: genresReducer,
      cart: cartReducer,
      authors: authorsReducer,
      user: userReducer,
    },
  });
const store = initializaStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
