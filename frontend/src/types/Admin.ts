export type UserSummary = {
  id: number;
  username: string;
  email: string;
  role: "USER" | "ADMIN";
};

export type User = UserSummary;

export type GetUsersData = {
  users: UserSummary[];
};

export type CreateUserVariables = {
  username: string;
  email: string;
  password: string;
  role: "USER" | "ADMIN";
};

export type UpdateUserVariables = {
  id: number;
  username?: string;
  email?: string;
  password?: string;
  role?: "USER" | "ADMIN";
};

export type DeleteUserVariables = {
  id: number;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  details: string;
  price: number;
  imageUrl: string;
  category: string;
};

export type GetAllProductsData = {
  products: {
    items: Product[];
    totalCount: number;
  };
};

export type CreateProductVariables = {
  name: string;
  description: string;
  details: string;
  price: number;
  imageUrl: string;
  category: string;
};

export type UpdateProductVariables = {
  id: number;
  name?: string;
  description?: string;
  details?: string;
  price?: number;
  imageUrl?: string;
  category?: string;
};

export type DeleteProductVariables = {
  id: number;
};
