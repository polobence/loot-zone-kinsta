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
    createUser: (
      _: unknown,
      args: { username: string; email: string; password: string },
      ctx: Context,
    ) => {
      return ctx.prisma.user.create({
        data: args,
      });
    },

    updateUser: (
      _: unknown,
      args: { id: number; username?: string; email?: string; password?: string },
      ctx: Context,
    ) => {
      return ctx.prisma.user.update({
        where: { id: args.id },
        data: {
          ...(args.username && { username: args.username }),
          ...(args.email && { email: args.email }),
          ...(args.password && { password: args.password }),
        },
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
