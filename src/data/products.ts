import type { Product } from "../types/Product";

export const products: Product[] = [
  {
    id: "1",
    name: "Mechanical Gaming Keyboard",
    price: 129.99,
    description: "RGB mechanical keyboard with blue switches",
    imageUrl: "https://via.placeholder.com/300x200",
    category: "keyboard",
  },
  {
    id: "2",
    name: "Gaming Mouse",
    price: 59.99,
    description: "High-precision optical sensor gaming mouse",
    imageUrl: "https://via.placeholder.com/300x200",
    category: "mouse",
  },
  {
    id: "3",
    name: "Gaming Headset",
    price: 89.99,
    description: "Surround sound headset with noise cancellation",
    imageUrl: "https://via.placeholder.com/300x200",
    category: "headset",
  },
];
