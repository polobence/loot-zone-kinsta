import { Context } from "../context.ts";

export const userResolvers = {
  Query: {
    users: (_: unknown, __: unknown, ctx: Context) => {
      return ctx.prisma.user.findMany({
        include: { products: true },
      });
    },

    user: (_: unknown, args: { id: number }, ctx: Context) => {
      return ctx.prisma.user.findUnique({
        where: { id: args.id },
        include: { products: true },
      });
    },
  },

  Mutation: {
    createUser: (_: unknown, args: { email: string; password: string }, ctx: Context) => {
      return ctx.prisma.user.create({
        data: args,
      });
    },

    updateUser: (_: unknown, args: { id: number; email?: string }, ctx: Context) => {
      return ctx.prisma.user.update({
        where: { id: args.id },
        data: { email: args.email },
      });
    },

    deleteUser: async (_: unknown, args: { id: number }, ctx: Context) => {
      await ctx.prisma.user.delete({
        where: { id: args.id },
      });
      return true;
    },
  },
};
