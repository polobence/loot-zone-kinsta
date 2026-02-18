import { Context } from "../context.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

    register: async (_: any, { username, email, password }: any, { prisma }: any) => {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          username,
          email: email.toLowerCase(),
          password: hashedPassword,
        },
      });

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);

      return { token, user };
    },

    login: async (_: any, { email, password }: any, { prisma }: any) => {
      const user = await prisma.user.findUnique({
        where: { email: email.toLowerCase() },
      });

      if (!user) throw new Error("User not found");

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) throw new Error("Invalid password");

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);

      return { token, user };
    },
  },
};
