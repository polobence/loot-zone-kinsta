import { gql } from "apollo-server";

export const typeDefs = gql`
  enum ProductCategory {
    keyboard
    mouse
    headset
    controller
    other
  }

  enum Role {
    USER
    ADMIN
  }

  type User {
    id: Int!
    username: String!
    role: Role!
    email: String!
    createdAt: String!
    cart: [Int!]!
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
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  extend type Mutation {
    register(username: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
  }

  type Query {
    me: User
    users: [User!]!
    user(id: Int!): User
    products(page: Int!, pageSize: Int!, category: ProductCategory, sort: String): ProductPage!
    product(id: Int!): Product
  }

  type ProductPage {
    items: [Product!]!
    totalCount: Int!
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!, role: Role): User!
    updateUser(id: Int!, username: String, email: String, password: String, role: Role): User!
    deleteUser(id: Int!): Boolean!

    setCart(productIds: [Int!]!): User!
    clearCart: User!

    createProduct(
      name: String!
      description: String!
      details: String!
      price: Float!
      imageUrl: String!
      category: ProductCategory!
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

    register(username: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
  }
`;
