import { PaginationResponse } from './pagination';
import { StatusType } from './status';

export type GenreType = {
  title: string;
  booksCount: number;
  __v: number;
  _id: string;
};

export type GenresResponse = {
  data: {
    genres: GenreType[];
    pagination: PaginationResponse;
  };
} & {
  status: StatusType;
};

export type GenresState = {
  genres: GenreType[];
  pagination: PaginationResponse;
  status: StatusType;
  error: string | null;
};