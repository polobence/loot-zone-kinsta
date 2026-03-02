import { prisma } from "./prisma.ts";
import jwt from "jsonwebtoken";

export type Role = "USER" | "ADMIN";

export interface Context {
  prisma: typeof prisma;
  user?: { id: number; role: Role };
}

export function createContext({ req }: { req?: any } = {}): Context {
  const authHeader = req?.headers?.authorization || req?.headers?.Authorization || "";
  const token = authHeader.replace("Bearer ", "");

  if (token) {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET!) as any;
      return { prisma, user: { id: payload.userId, role: payload.role || "USER" } };
    } catch (_err) {
      return { prisma };
    }
  }

  return { prisma };
}
