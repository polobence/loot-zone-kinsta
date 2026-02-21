import { Context } from "../context.ts";

export const productResolvers = {
  Query: {
    products: async (
      _: unknown,
      args: {
        page: number;
        pageSize: number;
        category?: string;
        sort?: string;
      },
      context: Context,
    ) => {
      const { page, pageSize, category, sort } = args;

      const skip = (page - 1) * pageSize;

      const where = category ? { category } : undefined;

      let orderBy: any = {};

      switch (sort) {
        case "price-asc":
          orderBy = { price: "asc" };
          break;
        case "price-desc":
          orderBy = { price: "desc" };
          break;
        case "name-asc":
          orderBy = { name: "asc" };
          break;
        case "name-desc":
          orderBy = { name: "desc" };
          break;
        default:
          orderBy = { createdAt: "desc" };
      }

      const [items, totalCount] = await Promise.all([
        context.prisma.product.findMany({
          where,
          skip,
          take: pageSize,
          orderBy,
        }),
        context.prisma.product.count({ where }),
      ]);

      return {
        items,
        totalCount,
      };
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
          details: args.details,
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
        include: { user: true },
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
