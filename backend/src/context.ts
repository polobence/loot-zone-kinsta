import { prisma } from "./prisma.ts";

export interface Context {
  prisma: typeof prisma;
}

export function createContext(): Context {
  return { prisma };
}
