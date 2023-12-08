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

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  data: {
    accessToken: string;
  };
} & {
  status: StatusType;
};

export type SignupRequest = {
  email: string;
  password: string;
  image: string;
  firstName: string;
  lastName: string;
};

export type SignupResponse = {
  data: {
    accessToken: string;
  };
} & {
  status: StatusType;
};

export type AccountState = {
  account: AccountType | null;
  status: StatusType;
  error: string | null;
};
