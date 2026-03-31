import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MockedProvider } from "@apollo/client/testing/react";
import { AdminPage } from "./AdminPage";
import { GET_USERS, GET_ALL_PRODUCTS } from "../graphql/queries";
import { CREATE_USER, CREATE_PRODUCT } from "../graphql/mutations";

const mocks = [
  {
    request: {
      query: GET_USERS,
    },
    result: {
      data: {
        users: [],
      },
    },
  },
  {
    request: {
      query: GET_ALL_PRODUCTS,
    },
    result: {
      data: {
        products: { items: [] },
      },
    },
  },
  {
    request: {
      query: CREATE_USER,
      variables: {
        username: "john",
        email: "john@example.com",
        password: "secret123",
        role: "USER",
      },
    },
    result: {
      data: {
        createUser: { id: 1, username: "john", email: "john@example.com", role: "USER" },
      },
    },
  },
  {
    request: {
      query: CREATE_PRODUCT,
      variables: {
        name: "Test Product",
        description: "Desc",
        details: "Details",
        price: 10,
        imageUrl: "url",
        category: "other",
      },
    },
    result: {
      data: {
        createProduct: {
          id: 1,
          name: "Test Product",
          description: "Desc",
          details: "Details",
          price: 10,
          imageUrl: "url",
          category: "other",
        },
      },
    },
  },
];

describe("AdminPage with react-hook-form", () => {
  test("shows user creation form validation errors", async () => {
    render(
      <MockedProvider mocks={mocks}>
        <AdminPage />
      </MockedProvider>,
    );

    const createUserButton = screen.getByRole("button", { name: /create user/i });
    await userEvent.click(createUserButton);

    expect(await screen.findByText(/username is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
  });

  test("shows product creation form validation errors", async () => {
    render(
      <MockedProvider mocks={mocks}>
        <AdminPage />
      </MockedProvider>,
    );

    const createProductButton = screen.getByRole("button", { name: /create product/i });
    await userEvent.click(createProductButton);

    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/description is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/details are required/i)).toBeInTheDocument();
    expect(await screen.findByText(/price is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/image url is required/i)).toBeInTheDocument();
  });
});
