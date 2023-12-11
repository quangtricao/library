import { BookType } from './book';

export type CartState = {
  bookInCart: BookType[];
  error: string | null;
};
