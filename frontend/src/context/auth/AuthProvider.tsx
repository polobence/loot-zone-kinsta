import { useEffect, useState, type ReactNode } from "react";
import type { User } from "../../types/User";
import { AuthContext } from "./AuthContext";
import { useCart } from "../cart/useCart";
import { useMutation } from "@apollo/client/react";
import { LOGIN } from "../../graphql/mutations";
import type { LoginMutationData, LoginMutationVariables } from "../../types/Login";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const { clearCart } = useCart();
  const [loginMutation] = useMutation<LoginMutationData, LoginMutationVariables>(LOGIN);

  useEffect(() => {
    if (!user) {
      clearCart();
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    try {
      const { data } = await loginMutation({
        variables: { email, password },
      });

      if (data?.login) {
        const { token, user } = data.login;

        localStorage.setItem("token", token);
        setUser(user);

        return true;
      }

      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const logout = () => {
    clearCart();
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>{children}</AuthContext.Provider>
  );
}
