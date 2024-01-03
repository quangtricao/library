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

export type BookDTO = {
  isbn: string;
  title: string;
  image: string;
  publisher: string;
  publishedYear: number;
  status: 'available' | 'borrowed';
  authors: AuthorType[];
  genres: GenreType[];
};

export type BooksState = {
  books: BookType[];
  pagination: PaginationResponse;
  status: StatusType;
  error: string | null;
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
  genreId: string;
  pagination: PaginationRequestParams;
};

export type AdminRequiredBookRequest = {
  token: string;
  book: BookDTO;
};

export type BookFilterRequest = {
  title?: string;
  status?: boolean | string;
  genre?: {
    title: string;
    genreId: string;
  };
  author?: {
    name: string;
    authorId: string;
  };
} & {
  pagination: PaginationRequestParams;
};
