import { PaginationResponse } from './pagination';
import { StatusType } from './status';

export type AuthorType = {
  name: string;
  bio: string;
  image: string;
  __v: number;
  _id: string;
};

export type AuthorsResponse = {
  data: {
    authors: AuthorType[];
    pagination: PaginationResponse;
  };
} & {
  status: StatusType;
};

export type AuthorsState = {
  authors: AuthorType[];
  pagination: PaginationResponse;
  status: StatusType;
  error: string | null;
};
