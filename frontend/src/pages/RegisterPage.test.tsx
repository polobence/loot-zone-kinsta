import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing/react";
import { NotificationProvider } from "../context/notification/NotificationProvider";
import { RegisterPage } from "./RegisterPage";
import { REGISTER } from "../graphql/mutations";

const mocks = [
  {
    request: {
      query: REGISTER,
      variables: { username: "john", email: "john@example.com", password: "secret123" },
    },
    result: {
      data: {
        register: {
          __typename: "AuthPayload",
          token: "fake-token",
          user: {
            __typename: "User",
            id: "1",
            username: "john",
            email: "john@example.com",
            role: "USER",
            cart: [],
          },
        },
      },
    },
  },
];

describe("RegisterPage with react-hook-form", () => {
  test("shows required field errors when submitted empty", async () => {
    render(
      <MockedProvider mocks={mocks}>
        <NotificationProvider>
          <MemoryRouter>
            <RegisterPage />
          </MemoryRouter>
        </NotificationProvider>
      </MockedProvider>,
    );

    await userEvent.click(screen.getByRole("button", { name: /register/i }));

    expect(await screen.findByText(/^Username is required$/i)).toBeInTheDocument();
    expect(await screen.findByText(/^Email is required$/i)).toBeInTheDocument();
    expect(await screen.findByText(/^Password is required$/i)).toBeInTheDocument();
    expect(await screen.findByText(/^Confirm Password is required$/i)).toBeInTheDocument();
  });

  test("shows password mismatch error", async () => {
    render(
      <MockedProvider mocks={mocks}>
        <NotificationProvider>
          <MemoryRouter>
            <RegisterPage />
          </MemoryRouter>
        </NotificationProvider>
      </MockedProvider>,
    );

    await userEvent.type(screen.getByPlaceholderText(/username/i), "john");
    await userEvent.type(screen.getByPlaceholderText(/email/i), "john@example.com");
    await userEvent.type(screen.getByPlaceholderText(/^password$/i), "secret123");
    await userEvent.type(screen.getByPlaceholderText(/confirm password/i), "secret321");

    await userEvent.click(screen.getByRole("button", { name: /register/i }));

    expect(await screen.findByText(/passwords do not match/i)).toBeInTheDocument();
  });
});
