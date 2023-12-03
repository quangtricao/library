import { PaginationResponse } from './pagination';
import { StatusType } from './status';

export type BookType = {
  isbn: string;
  title: string;
  image: string;
  publisher: string;
  publishedDate: string;
  status: 'available' | 'borrowed';
  borrowerId: string | undefined;
  borrowDate: string | undefined;
  returnDate: string | undefined;
  authors: string[] | undefined;
  genres: string[] | undefined;
  __v: number;
  _id: string;
};

export type BooksResponse = {
  data: {
    books: BookType[];
    pagination: PaginationResponse;
  };
} & {
  status: StatusType;
};
