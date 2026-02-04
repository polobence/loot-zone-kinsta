import { userResolvers } from "../resolvers/user.resolver.ts";
import { productResolvers } from "../resolvers/product.resolver.ts";

export const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...productResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...productResolvers.Mutation,
  },
};
