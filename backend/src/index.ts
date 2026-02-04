import "dotenv/config";
import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema/typeDefs.ts";
import { resolvers } from "./schema/resolvers.ts";
import { createContext } from "./context.ts";

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: createContext,
  });

  const { url } = await server.listen({ port: 4000 });
  console.log(`🚀 GraphQL server ready at ${url}`);
}

startServer();
