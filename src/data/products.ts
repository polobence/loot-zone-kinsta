import type { Product } from "../types/Product";

const categories: Product["category"][] = ["mouse", "keyboard", "headset", "controller", "other"];

export const products: Product[] = Array.from({ length: 100 }, (_, i) => ({
  id: (i + 1).toString(),
  name: `Product ${i + 1}`,
  price: parseFloat((Math.random() * 100 + 10).toFixed(2)),
  description: `This is the description for Product ${i + 1}`,
  imageUrl: `https://picsum.photos/200/200?random=${i + 1}`,
  category: categories[i % categories.length],
}));
