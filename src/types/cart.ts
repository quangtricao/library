import { BookType } from './book';

export type CartState = {
  booksToBorrow: BookType[];
  booksToReturn: BookType[];
  error: string | null;
};
