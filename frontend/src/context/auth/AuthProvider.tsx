import { useEffect, useState, type ReactNode } from "react";
import type { User } from "../../types/User";
import { AuthContext } from "./AuthContext";
import { useCart } from "../cart/useCart";
import { useMutation, useQuery } from "@apollo/client/react";
import { LOGIN, SET_CART } from "../../graphql/mutations";
import { GET_ME } from "../../graphql/queries";
import type { LoginMutationData, LoginMutationVariables } from "../../types/Login";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const { cartItems } = useCart();
  const [loginMutation] = useMutation<LoginMutationData, LoginMutationVariables>(LOGIN);
  const [setCartMutation] = useMutation(SET_CART);
  const { data: meData } = useQuery<{ me: User | null }>(GET_ME, {
    skip: !localStorage.getItem("token"),
  });

  useEffect(() => {
    if (meData?.me) {
      setUser(meData.me);
    } else if (meData === null && localStorage.getItem("token")) {
      localStorage.removeItem("token");
    }
  }, [meData]);

  useEffect(() => {
    if (!user) return;

    const productIds = (cartItems ?? []).flatMap((item) => Array(item.quantity).fill(item.id));

    setCartMutation({ variables: { productIds } }).catch((err) => {
      console.error("Failed to sync cart to backend:", err);
    });
  }, [user, cartItems, setCartMutation]);

  const login = async (email: string, password: string) => {
    try {
      const { data } = await loginMutation({
        variables: { email, password },
      });

      if (data?.login) {
        const { token, user } = data.login;

        localStorage.setItem("token", token);

        const productIds = (cartItems ?? []).flatMap((item) => Array(item.quantity).fill(item.id));
        if (productIds.length) {
          await setCartMutation({ variables: { productIds } }).catch((err) => {
            console.error("Failed to sync local cart on login:", err);
          });
        }

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
    const productIds = (cartItems ?? []).flatMap((item) => Array(item.quantity).fill(item.id));

    setCartMutation({ variables: { productIds } }).catch((err) => {
      console.error("Failed to persist cart on logout:", err);
    });

    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>{children}</AuthContext.Provider>
  );
}
