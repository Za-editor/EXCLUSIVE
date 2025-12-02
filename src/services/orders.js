// src/services/orders.js
import { supabase } from "../lib/supabase-client";

export const createOrder = async (userId, cartItems, totalAmount) => {
  try {
    // 1. Get the actual cart
    const { data: cart, error: cartError } = await supabase
      .from("carts")
      .select("id")
      .eq("user_id", userId)
      .single();

    if (cartError) throw cartError;
    if (!cart) throw new Error("Cart not found for this user.");

    const cartId = cart.id;

    // 2. Ensure cartItems have correct data
    if (!cartItems || cartItems.length === 0) {
      throw new Error("Cart is empty.");
    }

    // 3. Create the order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: userId,
        total_amount: totalAmount,
        status: "pending",
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // 4. Order items
    const orderItemsPayload = cartItems.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      unit_price: item.product_snapshot.price,
      product_snapshot: item.product_snapshot,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItemsPayload);

    if (itemsError) throw itemsError;

    // 5. Clear cart items
    const { error: clearError } = await supabase
      .from("cart_items")
      .delete()
      .eq("cart_id", cartId);

    if (clearError) throw clearError;

    return order;
  } catch (err) {
    console.error("Order creation failed:", err);
    throw err;
  }
};

/**
 * getOrdersForUser
 */
export const getOrdersForUser = async (userId) => {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
};

/**
 * getOrderWithItems
 */
export const getOrderWithItems = async (orderId) => {
  // Get order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .single();

  if (orderError) throw orderError;

  // Get items
  const { data: items, error: itemsError } = await supabase
    .from("order_items")
    .select("*")
    .eq("order_id", orderId);

  if (itemsError) throw itemsError;

  return { ...order, items };
};

/**
 * updateOrderStatus
 */
export const updateOrderStatus = async (orderId, status) => {
  const { data, error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", orderId)
    .select()
    .single();

  if (error) throw error;
  return data;
};
