import type { Product } from "../types/Product";

const categories: Product["category"][] = ["mouse", "keyboard", "headset", "controller", "other"];

export const products: Product[] = Array.from({ length: 100 }, (_, i) => ({
  id: (i + 1).toString(),
  name: `Product ${i + 1}`,
  price: parseFloat((Math.random() * 100 + 10).toFixed(2)),
  description: `This is the description for Product ${i + 1}`,
  details: `Product ${
    i + 1
  } is a high-quality gaming accessory. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. This product is perfect for gamers who want the best experience in both performance and style.`,
  imageUrl: `https://picsum.photos/200/200?random=${i + 1}`,
  category: categories[i % categories.length],
}));
