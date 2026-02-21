export type Product = {
  id: number;
  name: string;
  description: string;
  details: string;
  price: number;
  imageUrl: string;
  category: string;
  createdAt: string;
  user: {
    id: number;
    username: string;
  };
};

export type GetProductsData = {
  products: {
    items: Product[];
    totalCount: number;
  };
};

export type GetProductsVariables = {
  page: number;
  pageSize: number;
  category?: string;
  sort?: string;
};

export type GetProductData = {
  product: Product | null;
};
