import { useQuery } from "@tanstack/react-query";
import { getOrdersForUser, getOrderWithItems } from "../services/orders";
import { useAuth } from "./useAuth";

export const ORDERS_QUERY_KEY = (userId) => ["orders", userId];
export const ORDER_DETAIL_QUERY_KEY = (orderId) => ["order", orderId];

export const useOrdersQuery = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ORDERS_QUERY_KEY(user?.id),
    queryFn: () => getOrdersForUser(user.id),
    enabled: !!user?.id,
  });
};

export const useOrderDetailsQuery = (orderId) => {
  return useQuery({
    queryKey: ORDER_DETAIL_QUERY_KEY(orderId),
    queryFn: () => getOrderWithItems(orderId),
    enabled: !!orderId,
  });
};
