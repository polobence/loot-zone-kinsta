import { render, screen, fireEvent } from "@testing-library/react";
import { ProductCard } from "./ProductCard";
import type { Product } from "../types/Product";

const addToCartMock = jest.fn();
jest.mock("../context/cart/useCart", () => ({
  useCart: () => ({ addToCart: addToCartMock }),
}));

const showNotificationMock = jest.fn();
jest.mock("../context/notification/useNotification", () => ({
  useNotification: () => ({ showNotification: showNotificationMock }),
}));

const navigateMock = jest.fn();
jest.mock("react-router-dom", () => ({
  useNavigate: () => navigateMock,
}));

const product: Product = {
  id: "1",
  name: "Gaming Mouse",
  price: 50,
  description: "A great mouse",
  details: "Detailed info",
  imageUrl: "test.jpg",
  category: "mouse",
};

beforeEach(() => {
  jest.clearAllMocks();
});

test("renders product name", () => {
  render(<ProductCard product={product} />);
  expect(screen.getByText("Gaming Mouse")).toBeInTheDocument();
});

test("renders price correctly", () => {
  render(<ProductCard product={product} />);
  expect(screen.getByText("$50.00")).toBeInTheDocument();
});

test("clicking Add to cart calls addToCart and showNotification", () => {
  render(<ProductCard product={product} />);

  fireEvent.click(screen.getByText("Add to cart"));

  expect(addToCartMock).toHaveBeenCalledWith(product);
  expect(showNotificationMock).toHaveBeenCalledWith("Gaming Mouse added to cart!", "success");
});

test("clicking Show details calls navigate with product id", () => {
  render(<ProductCard product={product} />);

  fireEvent.click(screen.getByText("Show details"));

  expect(navigateMock).toHaveBeenCalledWith("/products/1");
});
