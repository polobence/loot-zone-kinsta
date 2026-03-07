import { Context } from "../context.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface NewUserArgs {
  username: string;
  email: string;
  password: string;
  role?: "USER" | "ADMIN";
}

interface AuthArgs {
  email: string;
  password: string;
}

export const userResolvers = {
  Query: {
    me: (_: unknown, __: unknown, ctx: Context) => {
      if (!ctx.user) return null;
      return ctx.prisma.user.findUnique({
        where: { id: ctx.user.id },
        include: { products: true },
      });
    },

    users: (_: unknown, __: unknown, ctx: Context) => {
      if (ctx.user?.role !== "ADMIN") throw new Error("Not authorized");
      return ctx.prisma.user.findMany({
        include: { products: true },
      });
    },

    user: (_: unknown, args: { id: number }, ctx: Context) => {
      if (ctx.user?.role !== "ADMIN") throw new Error("Not authorized");
      return ctx.prisma.user.findUnique({
        where: { id: args.id },
        include: { products: true },
      });
    },
  },

  Mutation: {
    createUser: async (_: unknown, args: NewUserArgs, ctx: Context) => {
      if (ctx.user?.role !== "ADMIN") throw new Error("Not authorized");
      const hashedPassword = await bcrypt.hash(args.password, 10);
      const data: { username: string; email: string; password: string; role?: "USER" | "ADMIN" } = {
        username: args.username,
        email: args.email,
        password: hashedPassword,
      };
      if (args.role) data.role = args.role;
      return ctx.prisma.user.create({
        data,
      });
    },

    updateUser: async (
      _: unknown,
      args: {
        id: number;
        username?: string;
        email?: string;
        password?: string;
        role?: "USER" | "ADMIN";
      },
      ctx: Context,
    ) => {
      if (ctx.user?.role !== "ADMIN") throw new Error("Not authorized");
      const hashedPassword = args.password ? await bcrypt.hash(args.password, 10) : undefined;
      return ctx.prisma.user.update({
        where: { id: args.id },
        data: {
          ...(args.username && { username: args.username }),
          ...(args.email && { email: args.email }),
          ...(hashedPassword && { password: hashedPassword }),
          ...(args.role && { role: args.role }),
        },
      });
    },

    deleteUser: async (_: unknown, args: { id: number }, ctx: Context) => {
      if (ctx.user?.role !== "ADMIN") throw new Error("Not authorized");
      await ctx.prisma.user.delete({
        where: { id: args.id },
      });
      return true;
    },

    register: async (
      _: unknown,
      { username, email, password }: NewUserArgs,
      { prisma }: Context,
    ) => {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          username,
          email: email.toLowerCase(),
          password: hashedPassword,
        },
      });

      const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET!);

      return { token, user };
    },

    login: async (_: unknown, { email, password }: AuthArgs, { prisma }: Context) => {
      const user = await prisma.user.findUnique({
        where: { email: email.toLowerCase() },
      });

      if (!user) throw new Error("User not found");

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) throw new Error("Invalid password");

      const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET!);

      return { token, user };
    },
  },
};
