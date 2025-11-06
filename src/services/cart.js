import { supabase } from "../lib/supabase-client";

export const ensureCart = async (userId) => {
  const { data, error } = await supabase
    .from("carts")
    .select("*")
    .eq("user_id", userId)
    .limit(1);

  if (error) throw error;
  if (data) return data;

  const { data: newCart, error: e2 } = await supabase
    .from("carts")
    .insert({ user_id: userId })
    .select()
    .single();
  if (e2) throw e2;
  return newCart;
};

export const getCartItems = async (userId) => {
  const cart = await ensureCart(userId);
  const { data, error } = await supabase
    .from("cart_items")
    .select("*")
    .eq("cart_id", cart.id);

  if (error) throw error;
  return data;
};

export const addToCart = async (userId, product, qty = 1) => {
  const cart = await ensureCart(userId);

  const { data: existing } = await supabase
    .from("cart_items")
    .select("*")
    .eq("cart_id", cart.id)
    .eq("product_id", product.id)
    .limit(1);

  if (existing) {
    const { data, error } = await supabase
      .from("cart_items")
      .update({ quantity: existing.quantity + qty, updated_at: new Date() })
      .eq("id", existing.id)
      .select()
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
        },
        quantity: qty,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};

export const updateCartitems = async (itemId, qty) => {
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
    .update({ qty, updated_at: new Date() })
    .eq("id", itemId)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const checkoutCart = async (userId) => {
  const cartItems = await getCartItems(userId);
  const total = cartItems.reduce(
    (sum, index) => sum + index.product_snapshot.price * index.quantity,
    0
  );

  const { data: order } = await supabase
    .from("orders")
    .insert({ user_id: userId, total_amount: total, status: "paid" })
    .select()
    .single();

  const inserts = cartItems.map((item) => ({
    order_id: order.id,
    product_id: item.product_id,
    product_snapshot: item.product_snapshot,
    quantity: item.quantity,
    unit_price: item.product_snapshot.price,
  }));

  await supabase.from("order_items").insert(inserts);
  await supabase
    .from("cart_items")
    .delete()
    .eq("cart_id", (await ensureCart(userId)).id);

  return order;
};
