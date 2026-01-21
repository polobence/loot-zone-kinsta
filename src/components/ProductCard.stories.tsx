import type { Meta, StoryObj } from "@storybook/react";
import { ProductCard } from "./ProductCard";
import type { Product } from "../types/Product";
import { CartContext } from "../context/cart/CartContext";
import { NotificationContext } from "../context/notification/NotificationContext";
import { StratusProvider } from "@kinsta/stratus";

const mockProduct: Product = {
  id: "1",
  name: "Gaming Mouse Pro",
  price: 59.99,
  description: "High precision RGB gaming mouse",
  details: "Long detailed description for the product page",
  imageUrl: "https://picsum.photos/400/300",
  category: "mouse",
};

const meta: Meta<typeof ProductCard> = {
  title: "Components/ProductCard",
  component: ProductCard,
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

type Story = StoryObj<typeof ProductCard>;

export const Default: Story = {
  args: {
    product: mockProduct,
  },
};

export const ExpensiveProduct: Story = {
  args: {
    product: {
      ...mockProduct,
      name: "Elite Gaming Mouse X",
      price: 149.99,
    },
  },
};
