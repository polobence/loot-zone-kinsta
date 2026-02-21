import { render, screen } from "@testing-library/react";
import { ProductList } from "./ProductList";
import type { Product } from "../types/Product";
import { CartContext } from "../context/cart/CartContext";
import { NotificationContext } from "../context/notification/NotificationContext";

const navigateMock = jest.fn();
jest.mock("react-router-dom", () => ({
  useNavigate: () => navigateMock,
}));

const mockCartValue = {
  cartItems: [],
  totalItems: 0,
  totalPrice: 0,
  addToCart: jest.fn(),
  removeFromCart: jest.fn(),
  clearCart: jest.fn(),
};

const mockNotificationValue = {
  showNotification: jest.fn(),
};

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Gaming Mouse",
    price: 59.99,
    description: "High precision RGB gaming mouse",
    details: "Detailed description",
    imageUrl: "test.jpg",
    category: "mouse",
    createdAt: "",
    user: { id: 1, username: "testuser" },
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    price: 119.99,
    description: "Premium mechanical keyboard",
    details: "Detailed description",
    imageUrl: "test2.jpg",
    category: "keyboard",
    createdAt: "",
    user: { id: 1, username: "testuser" },
  },
];

const renderWithContext = (component: React.ReactElement) => {
  return render(
    <CartContext.Provider value={mockCartValue}>
      <NotificationContext.Provider value={mockNotificationValue}>
        {component}
      </NotificationContext.Provider>
    </CartContext.Provider>,
  );
};

describe("ProductList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders all products", () => {
    renderWithContext(<ProductList products={mockProducts} />);

    expect(screen.getByText("Gaming Mouse")).toBeInTheDocument();
    expect(screen.getByText("Mechanical Keyboard")).toBeInTheDocument();
  });

  test("renders nothing when products array is empty", () => {
    const { container } = renderWithContext(<ProductList products={[]} />);

    const grid = container.querySelector("div");
    expect(grid).toBeEmptyDOMElement();
  });

  test("renders single product", () => {
    renderWithContext(<ProductList products={[mockProducts[0]]} />);

    expect(screen.getByText("Gaming Mouse")).toBeInTheDocument();
    expect(screen.queryByText("Mechanical Keyboard")).not.toBeInTheDocument();
  });

  test("renders correct number of products", () => {
    renderWithContext(<ProductList products={mockProducts} />);

    const productElements = screen.getAllByText(/Gaming Mouse|Mechanical Keyboard/);
    expect(productElements).toHaveLength(2);
  });

  test("renders ProductCard components for each product", () => {
    renderWithContext(<ProductList products={mockProducts} />);

    expect(screen.getByText("$59.99")).toBeInTheDocument();
    expect(screen.getByText("$119.99")).toBeInTheDocument();
  });
});
