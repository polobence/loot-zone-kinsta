import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Header } from "./Header";
import { AuthContext } from "../../context/auth/AuthContext";
import { StratusProvider } from "@kinsta/stratus";
import type { User } from "../../types/User";

describe("Header component", () => {
  const renderWithUser = (user: User | null) => {
    render(
      <StratusProvider language="en">
        <AuthContext.Provider
          value={{ user, setUser: () => {}, login: async () => false, logout: () => {} }}>
          <MemoryRouter>
            <Header />
          </MemoryRouter>
        </AuthContext.Provider>
      </StratusProvider>,
    );
  };

  it("does not show admin link for non-admin users", () => {
    const user: User = { id: "1", username: "john", email: "john@example.com", role: "USER" };
    renderWithUser(user);
    expect(screen.queryByText("Admin Panel")).not.toBeInTheDocument();
  });

  it("shows admin link when user is admin", () => {
    const user: User = { id: "1", username: "admin", email: "admin@example.com", role: "ADMIN" };
    renderWithUser(user);
    expect(screen.getByText("Admin Panel")).toBeInTheDocument();
  });
});
