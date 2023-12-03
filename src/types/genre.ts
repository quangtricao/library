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
    genre: GenreType[];
    pagination: PaginationResponse;
  };
} & {
  status: StatusType;
};
