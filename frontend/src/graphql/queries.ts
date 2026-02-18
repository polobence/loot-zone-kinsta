import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      description
      details
      price
      imageUrl
      category
      createdAt
      user {
        id
        username
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($id: Int!) {
    product(id: $id) {
      id
      name
      description
      details
      price
      imageUrl
      category
      createdAt
      user {
        id
        username
      }
    }
  }
`;
