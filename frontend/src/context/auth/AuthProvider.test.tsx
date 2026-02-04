import { render, screen, fireEvent } from "@testing-library/react";
import { AuthProvider } from "./AuthProvider";
import { useAuth } from "./useAuth";
import { users } from "../../data/users";

jest.mock("../cart/useCart", () => ({
  useCart: () => ({
    clearCart: jest.fn(),
  }),
}));

function TestComponent() {
  const { user, login, logout } = useAuth();

  return (
    <div>
      <div data-testid="username">{user?.username || "no-user"}</div>
      <button onClick={() => login("testuser", "password")}>login</button>
      <button onClick={() => login("invalid", "wrong")}>login-invalid</button>
      <button onClick={logout}>logout</button>
    </div>
  );
}

beforeEach(() => {
  if (!users.find((u) => u.username === "testuser")) {
    users.push({ id: "999", username: "testuser", email: "a@b.com", password: "password" });
  }
});

test("valid login sets the user", () => {
  render(
    <AuthProvider>
      <TestComponent />
    </AuthProvider>,
  );

  fireEvent.click(screen.getByText("login"));
  expect(screen.getByTestId("username")).toHaveTextContent("testuser");
});

test("invalid login does not set the user", () => {
  render(
    <AuthProvider>
      <TestComponent />
    </AuthProvider>,
  );

  fireEvent.click(screen.getByText("login-invalid"));
  expect(screen.getByTestId("username")).toHaveTextContent("no-user");
});

test("logout resets the user", () => {
  render(
    <AuthProvider>
      <TestComponent />
    </AuthProvider>,
  );

  fireEvent.click(screen.getByText("login"));
  expect(screen.getByTestId("username")).toHaveTextContent("testuser");

  fireEvent.click(screen.getByText("logout"));
  expect(screen.getByTestId("username")).toHaveTextContent("no-user");
});

test("registered user can log in", () => {
  render(
    <AuthProvider>
      <TestComponent />
    </AuthProvider>,
  );

  fireEvent.click(screen.getByText("login"));
  expect(screen.getByTestId("username")).toHaveTextContent("testuser");
});
