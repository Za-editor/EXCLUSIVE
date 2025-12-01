// src/hooks/useCartMutations.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCart, updateCartItems, removeCartItem } from "../services/cart";
import { useAuth } from "./useAuth";
import { CART_QUERY_KEY } from "./useCartQuery";

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: ({ product, qty = 1 }) => addToCart(user.id, product, qty),
    onSuccess: () => {
      queryClient.invalidateQueries(CART_QUERY_KEY(user?.id));
      // optional: refetchQueries for other keys e.g. cart-count
    },
  });
};

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: ({ itemId, qty }) => updateCartItems(itemId, qty),
    onSuccess: () => {
      queryClient.invalidateQueries(CART_QUERY_KEY(user?.id));
    },
  });
};

export const useRemoveCartItem = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: (itemId) => removeCartItem(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries(CART_QUERY_KEY(user?.id));
    },
  });
};
