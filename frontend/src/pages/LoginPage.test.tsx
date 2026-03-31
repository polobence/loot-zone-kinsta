import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing/react";
import { LoginPage } from "./LoginPage";
import { LOGIN } from "../graphql/mutations";

const loginMocks = [
  {
    request: {
      query: LOGIN,
      variables: { email: "john@example.com", password: "secret123" },
    },
    result: {
      data: {
        login: {
          token: "fake-token",
          user: { id: "1", username: "john", email: "john@example.com", role: "USER", cart: [] },
        },
      },
    },
  },
];

describe("LoginPage with react-hook-form", () => {
  test("shows validation errors for empty fields", async () => {
    render(
      <MockedProvider mocks={loginMocks}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </MockedProvider>,
    );

    await userEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
  });

  test("shows email format error", async () => {
    render(
      <MockedProvider mocks={loginMocks}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </MockedProvider>,
    );

    await userEvent.type(screen.getByPlaceholderText(/email/i), "bad-email");
    await userEvent.type(screen.getByPlaceholderText(/password/i), "secret123");
    await userEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(await screen.findByText(/invalid email format/i)).toBeInTheDocument();
  });
});
