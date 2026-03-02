import { gql } from "@apollo/client";

export const GET_ME = gql`
  query GetMe {
    me {
      id
      username
      email
      role
    }
  }
`;

export const GET_PRODUCTS = gql`
  query GetProducts($page: Int!, $pageSize: Int!, $category: ProductCategory, $sort: String) {
    products(page: $page, pageSize: $pageSize, category: $category, sort: $sort) {
      items {
        id
        name
        price
        imageUrl
        category
      }
      totalCount
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

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      username
      email
      role
    }
  }
`;

export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts {
    products(page: 1, pageSize: 1000) {
      items {
        id
        name
        description
        details
        price
        imageUrl
        category
      }
      totalCount
    }
  }
`;
