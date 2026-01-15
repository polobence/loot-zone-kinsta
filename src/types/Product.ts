export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  details: string;
  imageUrl: string;
  category: "keyboard" | "mouse" | "headset" | "controller" | "other";
}
