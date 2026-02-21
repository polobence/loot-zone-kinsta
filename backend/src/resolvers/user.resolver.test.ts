import { userResolvers } from "./user.resolver.ts";
import type { Context } from "../context.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

jest.mock("bcrypt");
jest.mock("jsonwebtoken");

const mockContext: Context = {
  prisma: {
    user: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    product: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    },
  },
} as unknown as Context;

describe("User Resolvers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_SECRET = "test-secret-key";
  });

  describe("users query", () => {
    it("should fetch all users with their products", async () => {
      const mockUsers = [
        {
          id: 1,
          username: "john_doe",
          email: "john@example.com",
          password: "hashed_password",
          createdAt: new Date(),
          products: [
            {
              id: 1,
              name: "Gaming Mouse",
              description: "Test",
              details: "Test",
              price: 49.99,
              imageUrl: "test.jpg",
              category: "mouse",
              createdAt: new Date(),
              userId: 1,
            },
          ],
        },
      ];

      (mockContext.prisma.user.findMany as jest.Mock).mockResolvedValue(mockUsers);

      const result = await userResolvers.Query.users(undefined, undefined, mockContext);

      expect(result).toEqual(mockUsers);
      expect(mockContext.prisma.user.findMany).toHaveBeenCalledWith({
        include: { products: true },
      });
    });

    it("should return empty array when no users exist", async () => {
      (mockContext.prisma.user.findMany as jest.Mock).mockResolvedValue([]);

      const result = await userResolvers.Query.users(undefined, undefined, mockContext);

      expect(result).toEqual([]);
    });
  });

  describe("user query", () => {
    it("should fetch a single user by id with products", async () => {
      const mockUser = {
        id: 1,
        username: "john_doe",
        email: "john@example.com",
        password: "hashed_password",
        createdAt: new Date(),
        products: [
          {
            id: 1,
            name: "Gaming Mouse",
            description: "Test",
            details: "Test",
            price: 49.99,
            imageUrl: "test.jpg",
            category: "mouse",
            createdAt: new Date(),
            userId: 1,
          },
        ],
      };

      (mockContext.prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      const result = await userResolvers.Query.user(undefined, { id: 1 }, mockContext);

      expect(result).toEqual(mockUser);
      expect(mockContext.prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        include: { products: true },
      });
    });

    it("should return null if user does not exist", async () => {
      (mockContext.prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await userResolvers.Query.user(undefined, { id: 999 }, mockContext);

      expect(result).toBeNull();
    });
  });

  describe("createUser mutation", () => {
    it("should create a new user", async () => {
      const mockUser = {
        id: 1,
        username: "newuser",
        email: "newuser@example.com",
        password: "plainpassword",
        createdAt: new Date(),
      };

      (mockContext.prisma.user.create as jest.Mock).mockResolvedValue(mockUser);

      const result = await userResolvers.Mutation.createUser(
        undefined,
        {
          username: "newuser",
          email: "newuser@example.com",
          password: "plainpassword",
        },
        mockContext,
      );

      expect(result).toEqual(mockUser);
      expect(mockContext.prisma.user.create).toHaveBeenCalledWith({
        data: {
          username: "newuser",
          email: "newuser@example.com",
          password: "plainpassword",
        },
      });
    });
  });

  describe("updateUser mutation", () => {
    it("should update user username", async () => {
      const updatedUser = {
        id: 1,
        username: "updated_username",
        email: "john@example.com",
        password: "hashed_password",
        createdAt: new Date(),
      };

      (mockContext.prisma.user.update as jest.Mock).mockResolvedValue(updatedUser);

      const result = await userResolvers.Mutation.updateUser(
        undefined,
        { id: 1, username: "updated_username" },
        mockContext,
      );

      expect(result).toEqual(updatedUser);
      expect(mockContext.prisma.user.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { username: "updated_username" },
      });
    });

    it("should update user email", async () => {
      const updatedUser = {
        id: 1,
        username: "john_doe",
        email: "newemail@example.com",
        password: "hashed_password",
        createdAt: new Date(),
      };

      (mockContext.prisma.user.update as jest.Mock).mockResolvedValue(updatedUser);

      const result = await userResolvers.Mutation.updateUser(
        undefined,
        { id: 1, email: "newemail@example.com" },
        mockContext,
      );

      expect(result).toEqual(updatedUser);
    });

    it("should update multiple user fields at once", async () => {
      const updatedUser = {
        id: 1,
        username: "new_username",
        email: "newemail@example.com",
        password: "hashed_password",
        createdAt: new Date(),
      };

      (mockContext.prisma.user.update as jest.Mock).mockResolvedValue(updatedUser);

      const result = await userResolvers.Mutation.updateUser(
        undefined,
        {
          id: 1,
          username: "new_username",
          email: "newemail@example.com",
        },
        mockContext,
      );

      expect(result).toEqual(updatedUser);
      expect(mockContext.prisma.user.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {
          username: "new_username",
          email: "newemail@example.com",
        },
      });
    });
  });

  describe("deleteUser mutation", () => {
    it("should delete a user and return true", async () => {
      (mockContext.prisma.user.delete as jest.Mock).mockResolvedValue({});

      const result = await userResolvers.Mutation.deleteUser(undefined, { id: 1 }, mockContext);

      expect(result).toBe(true);
      expect(mockContext.prisma.user.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });

  describe("register mutation", () => {
    it("should register a new user with hashed password and token", async () => {
      const plainPassword = "password123";
      const hashedPassword = "hashed_password_value";
      const mockUser = {
        id: 1,
        username: "newuser",
        email: "newuser@example.com",
        password: hashedPassword,
        createdAt: new Date(),
      };
      const mockToken = "jwt_token_value";

      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
      (mockContext.prisma.user.create as jest.Mock).mockResolvedValue(mockUser);
      (jwt.sign as jest.Mock).mockReturnValue(mockToken);

      const result = await userResolvers.Mutation.register(
        undefined,
        {
          username: "newuser",
          email: "newuser@example.com",
          password: plainPassword,
        },
        mockContext,
      );

      expect(result).toEqual({ token: mockToken, user: mockUser });
      expect(bcrypt.hash).toHaveBeenCalledWith(plainPassword, 10);
      expect(mockContext.prisma.user.create).toHaveBeenCalledWith({
        data: {
          username: "newuser",
          email: "newuser@example.com",
          password: hashedPassword,
        },
      });
      expect(jwt.sign).toHaveBeenCalledWith({ userId: mockUser.id }, "test-secret-key");
    });

    it("should convert email to lowercase during registration", async () => {
      const hashedPassword = "hashed_password_value";
      const mockUser = {
        id: 1,
        username: "newuser",
        email: "newuser@example.com",
        password: hashedPassword,
        createdAt: new Date(),
      };

      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
      (mockContext.prisma.user.create as jest.Mock).mockResolvedValue(mockUser);
      (jwt.sign as jest.Mock).mockReturnValue("token");

      await userResolvers.Mutation.register(
        undefined,
        {
          username: "newuser",
          email: "NEWUSER@EXAMPLE.COM",
          password: "password123",
        },
        mockContext,
      );

      expect(mockContext.prisma.user.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          email: "newuser@example.com",
        }),
      });
    });
  });

  describe("login mutation", () => {
    it("should login user with correct credentials", async () => {
      const mockUser = {
        id: 1,
        username: "john_doe",
        email: "john@example.com",
        password: "hashed_password",
        createdAt: new Date(),
      };
      const mockToken = "jwt_token_value";

      (mockContext.prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue(mockToken);

      const result = await userResolvers.Mutation.login(
        undefined,
        { email: "john@example.com", password: "password123" },
        mockContext,
      );

      expect(result).toEqual({ token: mockToken, user: mockUser });
      expect(mockContext.prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: "john@example.com" },
      });
      expect(bcrypt.compare).toHaveBeenCalledWith("password123", mockUser.password);
      expect(jwt.sign).toHaveBeenCalledWith({ userId: mockUser.id }, "test-secret-key");
    });

    it("should convert email to lowercase during login", async () => {
      const mockUser = {
        id: 1,
        username: "john_doe",
        email: "john@example.com",
        password: "hashed_password",
        createdAt: new Date(),
      };

      (mockContext.prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue("token");

      await userResolvers.Mutation.login(
        undefined,
        { email: "JOHN@EXAMPLE.COM", password: "password123" },
        mockContext,
      );

      expect(mockContext.prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: "john@example.com" },
      });
    });

    it("should throw error when user is not found", async () => {
      (mockContext.prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(
        userResolvers.Mutation.login(
          undefined,
          { email: "nonexistent@example.com", password: "password123" },
          mockContext,
        ),
      ).rejects.toThrow("User not found");
    });

    it("should throw error when password is invalid", async () => {
      const mockUser = {
        id: 1,
        username: "john_doe",
        email: "john@example.com",
        password: "hashed_password",
        createdAt: new Date(),
      };

      (mockContext.prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        userResolvers.Mutation.login(
          undefined,
          { email: "john@example.com", password: "wrongpassword" },
          mockContext,
        ),
      ).rejects.toThrow("Invalid password");
    });
  });
});
