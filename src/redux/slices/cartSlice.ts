import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { BookType } from '../../types/book';
import { CartState } from '../../types/cart';

const initialState: CartState = {
  bookInCart: [],
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<BookType>) {
      const foundBook = state.bookInCart.findIndex((item) => item._id === action.payload._id);
      if (foundBook !== -1) {
        state.error = 'You already have added this book to cart';
      } else {
        state.bookInCart.push(action.payload);
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.bookInCart.filter((item) => !(item._id === action.payload));
    },
    clearCart(state) {
      state.bookInCart = [];
    },
  },
});

export default cartSlice.reducer;
