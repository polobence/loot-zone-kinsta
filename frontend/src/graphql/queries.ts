import { gql } from "@apollo/client";

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
