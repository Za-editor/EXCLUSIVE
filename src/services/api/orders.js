// src/services/orders.js
import { supabase } from "../lib/supabase-client";

/**
 * createOrder
 * Creates an order, copies cart_items → order_items, clears the cart.
 */
export const createOrder = async (userId, cartItems, totalAmount) => {
  try {
    // 1. Create the order row
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: userId,
        total_amount: totalAmount,
        status: "pending",
        metadata: {},
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // 2. Prepare order_items payload
    const orderItemsPayload = cartItems.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.product_snapshot.price,
      product_snapshot: item.product_snapshot,
    }));

    // 3. Insert order_items
    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItemsPayload);

    if (itemsError) throw itemsError;

    // 4. Clear user cart
    const { error: clearError } = await supabase
      .from("cart_items")
      .delete()
      .eq("cart_id", cartItems[0]?.cart_id || ""); 

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
 * Returns a single order + its items.
 */
export const getOrderWithItems = async (orderId) => {
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .single();

  if (orderError) throw orderError;

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
