import { render, screen, fireEvent } from "@testing-library/react";
import { CartProvider } from "./CartProvider";
import { useCart } from "./useCart";
import { CART_STORAGE_KEY } from "../../constants/cart";
import type { Product } from "../../types/Product.ts";

const product: Product = {
  id: "1",
  name: "Gaming Mouse",
  price: 50,
  description: "Test product",
  details: "Detailed info",
  imageUrl: "",
  category: "mouse",
};

function TestComponent() {
  const { cartItems, addToCart, removeFromCart, clearCart, totalItems, totalPrice } = useCart();

  return (
    <div>
      <button onClick={() => addToCart(product)}>add</button>
      <button onClick={() => removeFromCart(product.id)}>remove</button>
      <button onClick={clearCart}>clear</button>

      <div data-testid="items">{totalItems}</div>
      <div data-testid="price">{totalPrice}</div>

      <div data-testid="length">{cartItems.length}</div>
    </div>
  );
}

beforeEach(() => {
  localStorage.clear();
});

test("adds a product to the cart", () => {
  render(
    <CartProvider>
      <TestComponent />
    </CartProvider>,
  );

  fireEvent.click(screen.getByText("add"));

  expect(screen.getByTestId("items")).toHaveTextContent("1");
  expect(screen.getByTestId("price")).toHaveTextContent("50");
  expect(screen.getByTestId("length")).toHaveTextContent("1");
});

test("increments quantity when adding same product twice", () => {
  render(
    <CartProvider>
      <TestComponent />
    </CartProvider>,
  );

  fireEvent.click(screen.getByText("add"));
  fireEvent.click(screen.getByText("add"));

  expect(screen.getByTestId("items")).toHaveTextContent("2");
  expect(screen.getByTestId("price")).toHaveTextContent("100");
});

test("removes one quantity from cart", () => {
  render(
    <CartProvider>
      <TestComponent />
    </CartProvider>,
  );

  fireEvent.click(screen.getByText("add"));
  fireEvent.click(screen.getByText("add"));
  fireEvent.click(screen.getByText("remove"));

  expect(screen.getByTestId("items")).toHaveTextContent("1");
});

test("clears the cart", () => {
  render(
    <CartProvider>
      <TestComponent />
    </CartProvider>,
  );

  fireEvent.click(screen.getByText("add"));
  fireEvent.click(screen.getByText("clear"));

  expect(screen.getByTestId("items")).toHaveTextContent("0");
  expect(screen.getByTestId("length")).toHaveTextContent("0");
});

test("restores cart from localStorage", () => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify([{ ...product, quantity: 2 }]));

  render(
    <CartProvider>
      <TestComponent />
    </CartProvider>,
  );

  expect(screen.getByTestId("items")).toHaveTextContent("2");
  expect(screen.getByTestId("price")).toHaveTextContent("100");
});

test("saves cart to localStorage on change", () => {
  render(
    <CartProvider>
      <TestComponent />
    </CartProvider>,
  );

  fireEvent.click(screen.getByText("add"));

  const stored = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "[]");

  expect(stored.length).toBe(1);
  expect(stored[0].quantity).toBe(1);
});
