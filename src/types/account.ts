import { StatusType } from './status';

export type AccountType = {
  _id: string;
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  __v: number;
  borrowedBooks: string[];
};

export type AccountResponse = {
  data: AccountType;
} & {
  status: StatusType;
};
