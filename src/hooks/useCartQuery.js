// src/hooks/useCartQuery.js
import { useQuery } from "@tanstack/react-query";
import { getCartItems } from "../services/cart";
import { useAuth } from "./useAuth";

export const CART_QUERY_KEY = (userId) => ["cart", userId];

export const useCartQuery = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: CART_QUERY_KEY(user?.id),
    queryFn: async () => {
      if (!user) return [];
      return await getCartItems(user.id);
    },
    enabled: !!user,
    staleTime: 1000 * 60 * 1, // 1 minute, tune as needed
    refetchOnWindowFocus: true,
  });
};
