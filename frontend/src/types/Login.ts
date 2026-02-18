import { type User } from "./User";

export interface LoginMutationData {
  login: {
    token: string;
    user: User;
  };
}

export interface LoginMutationVariables {
  email: string;
  password: string;
}
