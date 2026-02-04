import type { Meta, StoryObj } from "@storybook/react";
import { CartPage } from "./CartPage";
import { CartContext } from "../context/cart/CartContext";
import { AuthContext } from "../context/auth/AuthContext";
import type { User } from "../types/User";
import type { CartItem } from "../types/Cart";
import { StratusProvider } from "@kinsta/stratus";

const meta: Meta<typeof CartPage> = {
  title: "Pages/CartPage",
  component: CartPage,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof CartPage>;

const mockUser: User = {
  id: "1",
  username: "testuser",
  email: "testuser@example.com",
  password: "password",
};

const mockCartItems: CartItem[] = [
  {
    id: "1",
    name: "Gaming Mouse",
    price: 50,
    quantity: 2,
    description: "High precision gaming mouse",
    details: "Detailed informations",
    imageUrl: "https://example.com/mouse.jpg",
    category: "mouse",
  },
  {
    id: "2",
    name: "Keyboard",
    price: 100,
    quantity: 1,
    description: "Mechanical keyboard",
    details: "Detailed informations",
    imageUrl: "https://example.com/keyboard.jpg",
    category: "mouse",
  },
];

export const WithItems: Story = {
  render: () => (
    <StratusProvider language="en">
      <AuthContext.Provider value={{ user: mockUser, login: () => true, logout: () => {} }}>
        <CartContext.Provider
          value={{
            cartItems: mockCartItems,
            addToCart: () => {},
            removeFromCart: () => {},
            clearCart: () => {},
            totalItems: 3,
            totalPrice: 200,
          }}>
          <CartPage />
        </CartContext.Provider>
      </AuthContext.Provider>
    </StratusProvider>
  ),
};

export const EmptyCart: Story = {
  render: () => (
    <AuthContext.Provider value={{ user: mockUser, login: () => true, logout: () => {} }}>
      <CartContext.Provider
        value={{
          cartItems: [],
          addToCart: () => {},
          removeFromCart: () => {},
          clearCart: () => {},
          totalItems: 0,
          totalPrice: 0,
        }}>
        <CartPage />
      </CartContext.Provider>
    </AuthContext.Provider>
  ),
};

export const NotLoggedIn: Story = {
  render: () => (
    <AuthContext.Provider value={{ user: null, login: () => true, logout: () => {} }}>
      <CartContext.Provider
        value={{
          cartItems: [],
          addToCart: () => {},
          removeFromCart: () => {},
          clearCart: () => {},
          totalItems: 0,
          totalPrice: 0,
        }}>
        <CartPage />
      </CartContext.Provider>
    </AuthContext.Provider>
  ),
};
