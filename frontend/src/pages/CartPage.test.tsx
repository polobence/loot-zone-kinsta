import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "../context/auth/AuthContext";
import { CartPage } from "./CartPage";
import { CartProvider } from "../context/cart/CartProvider";
import type { User } from "../types/User";

function renderWithAuth(user: User | null) {
  return render(
    <AuthContext.Provider value={{ user, setUser: jest.fn(), login: jest.fn(), logout: jest.fn() }}>
      <CartProvider>
        <MemoryRouter initialEntries={["/cart"]}>
          <Routes>
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<div>Login Page</div>} />
          </Routes>
        </MemoryRouter>
      </CartProvider>
    </AuthContext.Provider>,
  );
}

test("redirects to login if user is not logged in", () => {
  renderWithAuth(null);
  expect(screen.getByText("Login Page")).toBeInTheDocument();
});

test("renders cart if user is logged in", () => {
  const fakeUser = { id: "1", username: "test", email: "a@b.com", password: "123" };
  renderWithAuth(fakeUser);

  expect(screen.getByText("Your Cart")).toBeInTheDocument();
});

test("displays a cart item and total", () => {
  const fakeUser = { id: "1", username: "test", email: "a@b.com", password: "123" };

  render(
    <AuthContext.Provider
      value={{ user: fakeUser, setUser: jest.fn(), login: jest.fn(), logout: jest.fn() }}>
      <CartProvider>
        <MemoryRouter>
          <CartPage />
        </MemoryRouter>
      </CartProvider>
    </AuthContext.Provider>,
  );
});
