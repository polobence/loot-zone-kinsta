import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      token
      user {
        id
        username
        email
        role
        cart
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        username
        email
        role
        cart
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($username: String!, $email: String!, $password: String!, $role: Role!) {
    createUser(username: $username, email: $email, password: $password, role: $role) {
      id
      username
      email
      role
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $id: Int!
    $username: String
    $email: String
    $password: String
    $role: Role
  ) {
    updateUser(id: $id, username: $username, email: $email, password: $password, role: $role) {
      id
      username
      email
      role
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: Int!) {
    deleteUser(id: $id)
  }
`;

export const SET_CART = gql`
  mutation SetCart($productIds: [Int!]!) {
    setCart(productIds: $productIds) {
      id
      cart
    }
  }
`;

export const CLEAR_CART = gql`
  mutation ClearCart {
    clearCart {
      id
      cart
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation CreateProduct(
    $name: String!
    $description: String!
    $details: String!
    $price: Float!
    $imageUrl: String!
    $category: ProductCategory!
  ) {
    createProduct(
      name: $name
      description: $description
      details: $details
      price: $price
      imageUrl: $imageUrl
      category: $category
    ) {
      id
      name
      description
      details
      price
      imageUrl
      category
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct(
    $id: Int!
    $name: String
    $description: String
    $details: String
    $price: Float
    $imageUrl: String
    $category: ProductCategory
  ) {
    updateProduct(
      id: $id
      name: $name
      description: $description
      details: $details
      price: $price
      imageUrl: $imageUrl
      category: $category
    ) {
      id
      name
      description
      details
      price
      imageUrl
      category
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: Int!) {
    deleteProduct(id: $id)
  }
`;
