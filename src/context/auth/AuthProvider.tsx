import { useEffect, useState, type ReactNode } from "react";
import { users, type User } from "../../data/users";
import { AuthContext } from "./AuthContext";
import { useCart } from "../cart/useCart";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const { clearCart } = useCart();

  useEffect(() => {
    if (!user) {
      clearCart();
    }
  }, [user]);

  const login = (username: string, password: string) => {
    const found = users.find((u) => u.username === username && u.password === password);
    if (found) {
      setUser(found);
      return true;
    }
    return false;
  };

  const logout = () => {
    clearCart();
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}
