// src/context/CartActionsContext.js
import  { createContext, useContext } from "react";
import {
  useAddToCart,
  useUpdateCartItem,
  useRemoveCartItem,
} from "../hooks/useCartMutations";


const CartActionsContext = createContext(null);

export const CartActionsProvider = ({ children }) => {
  const addMutation = useAddToCart();
  const updateMutation = useUpdateCartItem();
  const removeMutation = useRemoveCartItem();

  const addItem = async (product, qty = 1) => {
    return addMutation.mutateAsync({ product, qty });
  };

  const updateItem = async (itemId, qty) => {
    return updateMutation.mutateAsync({ itemId, qty });
  };

  const removeItem = async (itemId) => {
    return removeMutation.mutateAsync(itemId);
  };

  return (
    <CartActionsContext.Provider
      value={{
        addItem,
        updateItem,
        removeItem,
        addStatus: addMutation.status,
        updateStatus: updateMutation.status,
        removeStatus: removeMutation.status,
      }}
    >
      {children}
    </CartActionsContext.Provider>
  );
};

export const useCartActions = () => useContext(CartActionsContext);
