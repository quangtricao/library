import { BookType } from './book';
import { PaginationResponse } from './pagination';
import { StatusType } from './status';

export type BooksGenresState = {
  books: BookType[];
  pagination: PaginationResponse;
  status: StatusType;
  error: string | null;
};
