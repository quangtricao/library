import { PaginationResponse, PaginationRequestParams } from './pagination';
import { StatusType } from './status';
import { AuthorType } from './author';
import { GenreType } from './genre';

export type BookType = {
  isbn: string;
  title: string;
  image: string;
  publisher: string;
  publishedYear: number;
  status: 'available' | 'borrowed';
  borrowerId: string | undefined;
  borrowDate: string | undefined;
  returnDate: string | undefined;
  authors: AuthorType[];
  genres: GenreType[];
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

export type SingleBookResponse = {
  data: BookType;
} & {
  status: StatusType;
};

export type BooksAuthorsRequest = {
  authorId: string;
  pagination: PaginationRequestParams;
};

export type BooksGenresRequest = {
  authorId: string;
  pagination: PaginationRequestParams;
};

export type BooksState = {
  books: BookType[];
  pagination: PaginationResponse;
  status: StatusType;
  error: string | null;
};

export type BooksAuthorsState = {
  books: BookType[];
  pagination: PaginationResponse;
  status: StatusType;
  error: string | null;
};

export type BooksGenresState = {
  books: BookType[];
  pagination: PaginationResponse;
  status: StatusType;
  error: string | null;
};
