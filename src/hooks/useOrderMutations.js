import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder } from "../services/orders";
import { useAuth } from "./useAuth";
import { ORDERS_QUERY_KEY } from "./useOrderQuery";
import { CART_QUERY_KEY } from "./useCartQuery";

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: ({ cartItems, totalAmount }) =>
      createOrder(user.id, cartItems, totalAmount),

    onSuccess: () => {
      queryClient.invalidateQueries(ORDERS_QUERY_KEY(user?.id));
      queryClient.invalidateQueries(CART_QUERY_KEY(user?.id)); // cart gets cleared
    },
  });
};
