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
