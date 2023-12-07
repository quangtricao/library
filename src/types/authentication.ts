import { StatusType } from './status';

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
