import {
  createContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { supabase } from "../lib/supabase-client";
import { useAuth } from "../hooks/useAuth";
import { getCartItems, addToCart, updateCartItems } from "../services/cart";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    if (!user) {
      setCartItems([]);
      return;
    }
    setLoading(true);
    try {
      const data = await getCartItems(user.id);
      setCartItems([...data]);
    } catch (error) {
      console.error("Error fetching cart:", error.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const addItem = async (product, qty = 1) => {
    if (!user) {
      console.warn("User not logged in — redirect to login maybe?");
      return;
    }

    try {
      await addToCart(user.id, product, qty);
      await fetchCart();
    } catch (error) {
      console.error("Error adding to cart:", error.message);
    }
  };

  const updateItem = async (itemId, qty) => {
    try {
      await updateCartItems(itemId, qty);
      await fetchCart();
    } catch (error) {
      console.error("Error updating cart item:", error.message);
    }
    };
    
      const removeItem = async (itemId) => {
        try {
          await supabase.from("cart_items").delete().eq("id", itemId);
          setCartItems((prev) => prev.filter((i) => i.id !== itemId));
        } catch (error) {
          console.error("Error removing cart item:", error.message);
        }
    };
    
      useEffect(() => {
        fetchCart();
      }, [fetchCart]);

      return (
        <CartContext.Provider
          value={{
            cartItems,
            loading,
            refreshCart: fetchCart,
            addItem,
            updateItem,
            removeItem,
            cartCount: cartItems.length,
          }}
        >
          {children}
        </CartContext.Provider>
      );
};

