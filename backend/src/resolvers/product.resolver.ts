import { Context } from "../context.ts";

export const productResolvers = {
  Query: {
    products: (_: unknown, __: unknown, ctx: Context) => {
      return ctx.prisma.product.findMany({
        include: { user: true },
      });
    },

    product: (_: unknown, args: { id: number }, ctx: Context) => {
      return ctx.prisma.product.findUnique({
        where: { id: args.id },
        include: { user: true },
      });
    },
  },

  Mutation: {
    createProduct: (_: unknown, args: any, ctx: Context) => {
      return ctx.prisma.product.create({
        data: {
          name: args.name,
          description: args.description,
          price: args.price,
          imageUrl: args.imageUrl,
          category: args.category,
          user: {
            connect: { id: args.userId },
          },
        },
        include: { user: true },
      });
    },

    updateProduct: (_: unknown, args: any, ctx: Context) => {
      const { id, ...data } = args;

      return ctx.prisma.product.update({
        where: { id },
        data,
      });
    },

    deleteProduct: async (_: unknown, args: { id: number }, ctx: Context) => {
      await ctx.prisma.product.delete({
        where: { id: args.id },
      });
      return true;
    },
  },
};
