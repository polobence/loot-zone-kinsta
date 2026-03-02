export interface RegisterResponse {
  register: {
    token: string;
    user: {
      id: number;
      username: string;
      email: string;
      role: "USER" | "ADMIN";
    };
  };
}

export interface RegisterVariables {
  username: string;
  email: string;
  password: string;
}
