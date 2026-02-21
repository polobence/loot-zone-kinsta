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

    it("should sort products by price descending", async () => {
      (mockContext.prisma.product.findMany as jest.Mock).mockResolvedValue([]);
      (mockContext.prisma.product.count as jest.Mock).mockResolvedValue(0);

      await productResolvers.Query.products(
        undefined,
        { page: 1, pageSize: 10, sort: "price-desc" },
        mockContext,
      );

      expect(mockContext.prisma.product.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          orderBy: { price: "desc" },
        }),
      );
    });

    it("should sort products by name ascending", async () => {
      (mockContext.prisma.product.findMany as jest.Mock).mockResolvedValue([]);
      (mockContext.prisma.product.count as jest.Mock).mockResolvedValue(0);

      await productResolvers.Query.products(
        undefined,
        { page: 1, pageSize: 10, sort: "name-asc" },
        mockContext,
      );

      expect(mockContext.prisma.product.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          orderBy: { name: "asc" },
        }),
      );
    });

    it("should sort products by name descending", async () => {
      (mockContext.prisma.product.findMany as jest.Mock).mockResolvedValue([]);
      (mockContext.prisma.product.count as jest.Mock).mockResolvedValue(0);

      await productResolvers.Query.products(
        undefined,
        { page: 1, pageSize: 10, sort: "name-desc" },
        mockContext,
      );

      expect(mockContext.prisma.product.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          orderBy: { name: "desc" },
        }),
      );
    });

    it("should apply pagination with correct skip and take", async () => {
      (mockContext.prisma.product.findMany as jest.Mock).mockResolvedValue([]);
      (mockContext.prisma.product.count as jest.Mock).mockResolvedValue(100);

      await productResolvers.Query.products(undefined, { page: 3, pageSize: 20 }, mockContext);

      expect(mockContext.prisma.product.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          skip: 40,
          take: 20,
        }),
      );
    });

    it("should filter and sort products together", async () => {
      (mockContext.prisma.product.findMany as jest.Mock).mockResolvedValue([]);
      (mockContext.prisma.product.count as jest.Mock).mockResolvedValue(0);

      await productResolvers.Query.products(
        undefined,
        { page: 1, pageSize: 10, category: "mouse", sort: "price-asc" },
        mockContext,
      );

      expect(mockContext.prisma.product.findMany).toHaveBeenCalledWith({
        where: { category: "mouse" as any },
        skip: 0,
        take: 10,
        orderBy: { price: "asc" },
      });
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

    it("should return null if product does not exist", async () => {
      (mockContext.prisma.product.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await productResolvers.Query.product(undefined, { id: 999 }, mockContext);

      expect(result).toBeNull();
      expect(mockContext.prisma.product.findUnique).toHaveBeenCalledWith({
        where: { id: 999 },
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

  describe("updateProduct mutation", () => {
    it("should update product name", async () => {
      const updatedProduct = {
        id: 1,
        name: "Updated Mouse",
        description: "A gaming mouse",
        details: "Details here",
        price: 49.99,
        imageUrl: "mouse.jpg",
        category: "mouse",
        createdAt: new Date(),
        userId: 1,
        user: { id: 1, username: "user1" },
      };

      (mockContext.prisma.product.update as jest.Mock).mockResolvedValue(updatedProduct);

      const result = await productResolvers.Mutation.updateProduct(
        undefined,
        { id: 1, name: "Updated Mouse" },
        mockContext,
      );

      expect(result).toEqual(updatedProduct);
      expect(mockContext.prisma.product.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { name: "Updated Mouse" },
        include: { user: true },
      });
    });

    it("should update product price", async () => {
      const updatedProduct = {
        id: 1,
        name: "Gaming Mouse",
        description: "A gaming mouse",
        details: "Details here",
        price: 59.99,
        imageUrl: "mouse.jpg",
        category: "mouse",
        createdAt: new Date(),
        userId: 1,
        user: { id: 1, username: "user1" },
      };

      (mockContext.prisma.product.update as jest.Mock).mockResolvedValue(updatedProduct);

      const result = await productResolvers.Mutation.updateProduct(
        undefined,
        { id: 1, price: 59.99 },
        mockContext,
      );

      expect(result).toEqual(updatedProduct);
      expect(mockContext.prisma.product.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { price: 59.99 },
        include: { user: true },
      });
    });

    it("should update multiple product fields", async () => {
      const updatedProduct = {
        id: 1,
        name: "Premium Gaming Mouse",
        description: "High precision mouse",
        details: "Advanced details",
        price: 99.99,
        imageUrl: "new-mouse.jpg",
        category: "mouse",
        createdAt: new Date(),
        userId: 1,
        user: { id: 1, username: "user1" },
      };

      (mockContext.prisma.product.update as jest.Mock).mockResolvedValue(updatedProduct);

      const result = await productResolvers.Mutation.updateProduct(
        undefined,
        {
          id: 1,
          name: "Premium Gaming Mouse",
          description: "High precision mouse",
          price: 99.99,
          imageUrl: "new-mouse.jpg",
        },
        mockContext,
      );

      expect(result).toEqual(updatedProduct);
      expect(mockContext.prisma.product.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {
          name: "Premium Gaming Mouse",
          description: "High precision mouse",
          price: 99.99,
          imageUrl: "new-mouse.jpg",
        },
        include: { user: true },
      });
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

    it("should handle deletion of multiple products independently", async () => {
      (mockContext.prisma.product.delete as jest.Mock).mockResolvedValue({});

      const result1 = await productResolvers.Mutation.deleteProduct(
        undefined,
        { id: 1 },
        mockContext,
      );
      const result2 = await productResolvers.Mutation.deleteProduct(
        undefined,
        { id: 2 },
        mockContext,
      );

      expect(result1).toBe(true);
      expect(result2).toBe(true);
      expect(mockContext.prisma.product.delete).toHaveBeenCalledTimes(2);
    });
  });
});
