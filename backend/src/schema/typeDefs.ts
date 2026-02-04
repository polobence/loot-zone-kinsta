import { gql } from "apollo-server";

export const typeDefs = gql`
  enum ProductCategory {
    keyboard
    mouse
    headset
    controller
    other
  }

  type User {
    id: Int!
    username: String!
    email: String!
    password: String!
    createdAt: String!
    products: [Product!]!
  }

  type Product {
    id: Int!
    name: String!
    description: String!
    details: String!
    price: Float!
    imageUrl: String!
    category: ProductCategory!
    createdAt: String!
    user: User!
  }

  type Query {
    users: [User!]!
    user(id: Int!): User

    products: [Product!]!
    product(id: Int!): Product
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User!
    updateUser(id: Int!, username: String, email: String, password: String): User!
    deleteUser(id: Int!): Boolean!

    createProduct(
      name: String!
      description: String!
      details: String!
      price: Float!
      imageUrl: String!
      category: ProductCategory!
      userId: Int!
    ): Product!

    updateProduct(
      id: Int!
      name: String
      description: String
      details: String
      price: Float
      imageUrl: String
      category: ProductCategory
    ): Product!

    deleteProduct(id: Int!): Boolean!
  }
`;
