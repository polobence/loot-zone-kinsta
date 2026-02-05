import type { Meta, StoryObj } from "@storybook/react";
import { ProductList } from "./ProductList";
import type { Product } from "../types/Product";
import { CartContext } from "../context/cart/CartContext";
import { NotificationContext } from "../context/notification/NotificationContext";
import { StratusProvider } from "@kinsta/stratus";

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Gaming Mouse Pro",
    price: 59.99,
    description: "High precision RGB gaming mouse",
    details: "Long detailed description for the product page",
    imageUrl: "https://picsum.photos/400/300?random=1",
    category: "mouse",
  },
  {
    id: "2",
    name: "Mechanical Keyboard",
    price: 119.99,
    description: "Premium mechanical gaming keyboard",
    details: "Features hot-swappable switches",
    imageUrl: "https://picsum.photos/400/300?random=2",
    category: "keyboard",
  },
  {
    id: "3",
    name: "Wireless Headset",
    price: 89.99,
    description: "Crystal clear audio wireless headset",
    details: "30-hour battery life",
    imageUrl: "https://picsum.photos/400/300?random=3",
    category: "headset",
  },
  {
    id: "4",
    name: "Gaming Mouse",
    price: 299.99,
    description: "High precision RGB gaming mouse",
    details: "1ms response time",
    imageUrl: "https://picsum.photos/400/300?random=4",
    category: "mouse",
  },
];

const meta: Meta<typeof ProductList> = {
  title: "Components/ProductList",
  component: ProductList,
  decorators: [
    (Story) => (
      <StratusProvider language="en">
        <CartContext.Provider
          value={{
            cartItems: [],
            totalItems: 0,
            totalPrice: 0,
            addToCart: (product) => {
              console.log("🛒 addToCart called:", product);
            },
            removeFromCart: () => {},
            clearCart: () => {},
          }}>
          <NotificationContext.Provider
            value={{
              showNotification: (message, type) => {
                console.log(`🔔 Notification [${type}]:`, message);
              },
            }}>
            {Story()}
          </NotificationContext.Provider>
        </CartContext.Provider>
      </StratusProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ProductList>;

export const Default: Story = {
  args: {
    products: mockProducts,
  },
};

export const SingleProduct: Story = {
  args: {
    products: [mockProducts[0]],
  },
};

export const TwoProducts: Story = {
  args: {
    products: [mockProducts[0], mockProducts[1]],
  },
};

export const Empty: Story = {
  args: {
    products: [],
  },
};

export const ManyProducts: Story = {
  args: {
    products: [
      ...mockProducts,
      ...mockProducts.map((p, i) => ({
        ...p,
        id: `${p.id}-copy-${i}`,
        name: `${p.name} - Copy ${i}`,
      })),
    ],
  },
};
