import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AuthProvider } from "./AuthProvider";
import { useAuth } from "./useAuth";
import { users } from "../../data/users";

jest.mock("../cart/useCart", () => ({
  useCart: () => ({
    clearCart: jest.fn(),
  }),
}));

jest.mock("@apollo/client/react", () => ({
  useMutation: () => {
    const mockFn = jest.fn(async ({ variables }) => {
      // Add a testuser if it doesn't exist
      if (!users.find((u) => u.email === "testuser@example.com")) {
        users.push({ id: "999", username: "testuser", email: "testuser@example.com" });
      }

      const user = users.find((u) => u.email === variables.email);
      if (user) {
        return Promise.resolve({ data: { login: { token: "test-token", user } } });
      }
      return Promise.reject(new Error("User not found"));
    });
    return [mockFn];
  },
}));

function TestComponent() {
  const { user, login, logout } = useAuth();

  return (
    <div>
      <div data-testid="username">{user?.username || "no-user"}</div>
      <button onClick={() => login("testuser@example.com", "password")}>login</button>
      <button onClick={() => login("invalid", "wrong")}>login-invalid</button>
      <button onClick={logout}>logout</button>
    </div>
  );
}

beforeEach(() => {
  localStorage.clear();
});

test("valid login sets the user", async () => {
  render(
    <AuthProvider>
      <TestComponent />
    </AuthProvider>,
  );

  fireEvent.click(screen.getByText("login"));
  await waitFor(() => {
    expect(screen.getByTestId("username")).toHaveTextContent("testuser");
  });
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

test("logout resets the user", async () => {
  render(
    <AuthProvider>
      <TestComponent />
    </AuthProvider>,
  );

  fireEvent.click(screen.getByText("login"));
  await waitFor(() => {
    expect(screen.getByTestId("username")).toHaveTextContent("testuser");
  });

  fireEvent.click(screen.getByText("logout"));
  expect(screen.getByTestId("username")).toHaveTextContent("no-user");
});

test("registered user can log in", async () => {
  render(
    <AuthProvider>
      <TestComponent />
    </AuthProvider>,
  );

  fireEvent.click(screen.getByText("login"));
  await waitFor(() => {
    expect(screen.getByTestId("username")).toHaveTextContent("testuser");
  });
});
