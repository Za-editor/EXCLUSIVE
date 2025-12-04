
import { supabase } from "../lib/supabase-client";

// ensureCart: returns cart row for user (creates if missing) 
export const ensureCart = async (userId) => {
  const { data, error } = await supabase
    .from("carts")
    .select("*")
    .eq("user_id", userId)
    .single();

  // PGRST116 = row not found from PostgREST (supabase)
  if (error && error.code !== "PGRST116") throw error;

  if (data) return data;

  const { data: newCart, error: e2 } = await supabase
    .from("carts")
    .insert({ user_id: userId })
    .select()
    .single();

  if (e2) throw e2;
  return newCart;
};

//  getCartItems: returns all cart_items for user with consistent shape 
export const getCartItems = async (userId) => {
  const cart = await ensureCart(userId);

  const { data, error } = await supabase
    .from("cart_items")
    // select explicit fields to avoid partial rows / stale shape
    .select("id, cart_id, product_id, quantity, updated_at, product_snapshot")
    .eq("cart_id", cart.id)
    .order("id", { ascending: true });

  if (error) throw error;
  return data || [];
};

// addToCart: inserts or updates and returns the inserted/updated row 
export const addToCart = async (userId, product, qty = 1) => {
  const cart = await ensureCart(userId);
  const imageUrl = product.image || product.images?.[0] || "";

  const { data: existingItems, error: existingError } = await supabase
    .from("cart_items")
    .select("id, quantity")
    .eq("cart_id", cart.id)
    .eq("product_id", product.id)
    .limit(1)
    .single();

  if (existingError && existingError.code !== "PGRST116") throw existingError;

  if (existingItems) {
    const { data, error } = await supabase
      .from("cart_items")
      .update({
        quantity: existingItems.quantity + qty,
        updated_at: new Date(),
      })
      .eq("id", existingItems.id)
      .select("id, cart_id, product_id, quantity, updated_at, product_snapshot")
      .single();

    if (error) throw error;
    return data;
  } else {
    const { data, error } = await supabase
      .from("cart_items")
      .insert({
        cart_id: cart.id,
        product_id: product.id,
        product_snapshot: {
          title: product.title,
          price: product.price,
          image: imageUrl,
        },
        quantity: qty,
      })
      .select("id, cart_id, product_id, quantity, updated_at, product_snapshot")
      .single();

    if (error) throw error;
    return data;
  }
};

//  updateCartItems: sets quantity (or deletes when qty <= 0) and returns result 
export const updateCartItems = async (itemId, qty) => {
  if (qty <= 0) {
    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("id", itemId);
    if (error) throw error;
    return null;
  }

  const { data, error } = await supabase
    .from("cart_items")
    .update({ quantity: qty, updated_at: new Date() })
    .eq("id", itemId)
    .select("id, cart_id, product_id, quantity, updated_at, product_snapshot")
    .single();

  if (error) throw error;
  return data;
};

//  removeCartItem: delete a single item 
export const removeCartItem = async (itemId) => {
  const { data, error } = await supabase
    .from("cart_items")
    .delete()
    .eq("id", itemId)
    .select()
    .single();

  if (error) throw error;
  return data;
};
