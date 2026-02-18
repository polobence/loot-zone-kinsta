export interface RegisterResponse {
  register: {
    token: string;
    user: {
      id: number;
      username: string;
      email: string;
    };
  };
}

export interface RegisterVariables {
  username: string;
  email: string;
  password: string;
}
