import { productResolvers } from "./product.resolver.ts";
import type { Context } from "../context.ts";

const mockContext: Context = {
  prisma: {
    product: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    },
    user: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
} as unknown as Context;

describe("Product Resolvers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("products query", () => {
    it("should fetch products with pagination", async () => {
      const mockProducts = [
        {
          id: 1,
          name: "Gaming Mouse",
          description: "High precision mouse",
          details: "RGB Gaming Mouse",
          price: 59.99,
          imageUrl: "mouse.jpg",
          category: "mouse",
          createdAt: new Date(),
          userId: 1,
        },
      ];

      (mockContext.prisma.product.findMany as jest.Mock).mockResolvedValue(mockProducts);
      (mockContext.prisma.product.count as jest.Mock).mockResolvedValue(1);

      const result = await productResolvers.Query.products(
        undefined,
        { page: 1, pageSize: 10 },
        mockContext,
      );

      expect(result.items).toEqual(mockProducts);
      expect(result.totalCount).toBe(1);
      expect(mockContext.prisma.product.findMany).toHaveBeenCalledWith({
        where: undefined,
        skip: 0,
        take: 10,
        orderBy: { createdAt: "desc" },
      });
    });

    it("should filter products by category", async () => {
      (mockContext.prisma.product.findMany as jest.Mock).mockResolvedValue([]);
      (mockContext.prisma.product.count as jest.Mock).mockResolvedValue(0);

      await productResolvers.Query.products(
        undefined,
        { page: 1, pageSize: 10, category: "keyboard" },
        mockContext,
      );

      expect(mockContext.prisma.product.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { category: "keyboard" as any },
        }),
      );
    });

    it("should sort products by price ascending", async () => {
      (mockContext.prisma.product.findMany as jest.Mock).mockResolvedValue([]);
      (mockContext.prisma.product.count as jest.Mock).mockResolvedValue(0);

      await productResolvers.Query.products(
        undefined,
        { page: 1, pageSize: 10, sort: "price-asc" },
        mockContext,
      );

      expect(mockContext.prisma.product.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          orderBy: { price: "asc" },
        }),
      );
    });
  });

  describe("product query", () => {
    it("should fetch a single product by id", async () => {
      const mockProduct = {
        id: 1,
        name: "Gaming Mouse",
        description: "High precision mouse",
        details: "RGB Gaming Mouse",
        price: 59.99,
        imageUrl: "mouse.jpg",
        category: "mouse",
        createdAt: new Date(),
        userId: 1,
        user: { id: 1, username: "user1" },
      };

      (mockContext.prisma.product.findUnique as jest.Mock).mockResolvedValue(mockProduct);

      const result = await productResolvers.Query.product(undefined, { id: 1 }, mockContext);

      expect(result).toEqual(mockProduct);
      expect(mockContext.prisma.product.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        include: { user: true },
      });
    });
  });

  describe("createProduct mutation", () => {
    it("should create a new product", async () => {
      const mockProduct = {
        id: 1,
        name: "New Mouse",
        description: "A new gaming mouse",
        details: "Details here",
        price: 49.99,
        imageUrl: "new-mouse.jpg",
        category: "mouse",
        createdAt: new Date(),
        userId: 1,
        user: { id: 1, username: "user1" },
      };

      (mockContext.prisma.product.create as jest.Mock).mockResolvedValue(mockProduct);

      const result = await productResolvers.Mutation.createProduct(
        undefined,
        {
          name: "New Mouse",
          description: "A new gaming mouse",
          details: "Details here",
          price: 49.99,
          imageUrl: "new-mouse.jpg",
          category: "mouse",
          userId: 1,
        },
        mockContext,
      );

      expect(result).toEqual(mockProduct);
      expect(mockContext.prisma.product.create).toHaveBeenCalled();
    });
  });

  describe("deleteProduct mutation", () => {
    it("should delete a product and return true", async () => {
      (mockContext.prisma.product.delete as jest.Mock).mockResolvedValue({});

      const result = await productResolvers.Mutation.deleteProduct(
        undefined,
        { id: 1 },
        mockContext,
      );

      expect(result).toBe(true);
      expect(mockContext.prisma.product.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });
});
