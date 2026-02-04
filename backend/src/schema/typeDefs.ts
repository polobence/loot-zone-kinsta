import { gql } from "apollo-server";

export const typeDefs = gql`
  type User {
    id: Int!
    email: String!
    createdAt: String!
    products: [Product!]!
  }

  type Product {
    id: Int!
    name: String!
    description: String!
    price: Float!
    imageUrl: String!
    category: String!
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
    createUser(email: String!, password: String!): User!
    updateUser(id: Int!, email: String): User!
    deleteUser(id: Int!): Boolean!

    createProduct(
      name: String!
      description: String!
      price: Float!
      imageUrl: String!
      category: String!
      userId: Int!
    ): Product!

    updateProduct(
      id: Int!
      name: String
      description: String
      price: Float
      imageUrl: String
      category: String
    ): Product!

    deleteProduct(id: Int!): Boolean!
  }
`;
