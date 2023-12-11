import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { BookType } from '../../types/book';
import { CartState } from '../../types/cart';

const initialState: CartState = {
  booksToBorrow: [],
  booksToReturn: [],
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addBookToBorrow(state, action: PayloadAction<BookType>) {
      state.booksToBorrow.push(action.payload);
    },
    addBookToReturn(state, action: PayloadAction<BookType>) {
      state.booksToReturn.push(action.payload);
    },
    removeBookToBorrow(state, action: PayloadAction<string>) {
      state.booksToBorrow = state.booksToBorrow.filter((book) => book._id !== action.payload);
    },
    removeBookToReturn(state, action: PayloadAction<string>) {
      state.booksToReturn = state.booksToReturn.filter((book) => book._id !== action.payload);
    },
    clearCart(state) {
      state.booksToBorrow = [];
      state.booksToReturn = [];
    },
  },
});

export const {
  addBookToBorrow,
  addBookToReturn,
  removeBookToBorrow,
  removeBookToReturn,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
