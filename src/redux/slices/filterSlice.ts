import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type State = {
  title: string;
  status: string;
  genre: {
    title: string;
    genreId: string;
  };
  author: {
    name: string;
    authorId: string;
  };
};

const initialState = {
  title: '',
  status: '',
  genre: {
    title: '',
    genreId: '',
  },
  author: {
    name: '',
    authorId: '',
  },
};

const filterSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateFilter(_state, action: PayloadAction<State>) {
      return action.payload;
    },
    clearFilter(state) {
      state = {
        title: '',
        status: '',
        genre: {
          title: '',
          genreId: '',
        },
        author: {
          name: '',
          authorId: '',
        },
      };
    },
  },
});

export const { updateFilter } = filterSlice.actions;
export default filterSlice.reducer;
