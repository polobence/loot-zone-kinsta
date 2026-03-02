import type { User } from "../types/User";

export const users: User[] = [
  {
    id: "1",
    username: "john_doe",
    email: "john@example.com",
    role: "USER",
  },
  {
    id: "2",
    username: "jane_smith",
    email: "jane@example.com",
    role: "USER",
  },
  {
    id: "3",
    username: "admin_user",
    email: "admin@example.com",
    role: "ADMIN",
  },
];
