import { Link, useNavigate } from "react-router-dom";
import { useCartQuery } from "../hooks/useCartQuery";
import {
  useUpdateCartItem,
  useRemoveCartItem,
} from "../hooks/useCartMutations";
import { useEffect, useState } from "react";

// ---------------- CART ITEM ROW ----------------
const CartItemRow = ({ item, updateItem, removeItem }) => {
  const handleQtyChange = (e) => {
    const qty = parseInt(e.target.value, 10) || 1;
    updateItem(item.id, qty);
  };

  return (
    <>
      {/* DESKTOP ROW */}
      <tr className="hidden md:table-row border-b hover:bg-gray-50 transition">
        <td className="py-4 px-6 flex items-center gap-4">
          <img
            src={item.product_snapshot.image}
            alt={item.product_snapshot.title}
            className="w-16 h-16 rounded-md object-cover"
          />
          <div className="text-gray-800 font-medium">
            {item.product_snapshot.title}
          </div>
        </td>

        <td className="py-4 px-6 text-gray-700">
          ${item.product_snapshot.price.toFixed(2)}
        </td>

        <td className="py-4 px-6">
          <input
            type="number"
            min={1}
            value={item.quantity}
            onChange={handleQtyChange}
            className="border border-gray-300 rounded-md px-3 py-1 w-20 text-sm"
          />
        </td>

        <td className="py-4 px-6 font-medium">
          ${(item.product_snapshot.price * item.quantity).toFixed(2)}
        </td>

        <td className="py-4 px-6 text-right">
          <button
            onClick={() => removeItem(item.id)}
            className="text-red-500 hover:text-red-700 font-medium"
          >
            Remove
          </button>
        </td>
      </tr>

      {/* MOBILE CARD */}
      <div className="md:hidden border rounded-lg p-4 mb-4 bg-white shadow-sm">
        <div className="flex items-center gap-4">
          <img
            src={item.product_snapshot.image}
            alt={item.product_snapshot.title}
            className="w-20 h-20 rounded-md object-cover"
          />
          <div className="flex-1">
            <p className="font-medium text-gray-800 text-sm">
              {item.product_snapshot.title}
            </p>
            <p className="text-gray-600 text-sm mt-1">
              ${item.product_snapshot.price.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Qty + Subtotal */}
        <div className="flex justify-between items-center mt-4">
          <div>
            <label className="text-sm text-gray-500">Quantity</label>
            <input
              type="number"
              min={1}
              value={item.quantity}
              onChange={handleQtyChange}
              className="border border-gray-300 rounded-md px-3 py-1 w-20 mt-1 text-sm"
            />
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-500">Subtotal</p>
            <p className="font-semibold text-gray-800 mt-1">
              ${(item.product_snapshot.price * item.quantity).toFixed(2)}
            </p>
          </div>
        </div>

        <button
          onClick={() => removeItem(item.id)}
          className="mt-4 text-red-500 text-sm font-medium"
        >
          Remove
        </button>
      </div>
    </>
  );
};

// ---------------- MAIN CART PAGE ----------------
const CartPage = () => {
  const navigate = useNavigate();
  const { data: cartItemsFromServer = [], isLoading } = useCartQuery();
  const [cartItems, setCartItems] = useState([]);

  const updateCartMutation = useUpdateCartItem();
  const removeCartMutation = useRemoveCartItem();

  useEffect(() => {
    setCartItems(cartItemsFromServer);
  }, [cartItemsFromServer]);

  const updateItem = (itemId, qty) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: qty } : item
      )
    );
    updateCartMutation.mutate({ itemId, qty });
  };

  const removeItem = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    removeCartMutation.mutate(itemId);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product_snapshot.price * item.quantity,
    0
  );

  if (isLoading)
    return <div className="text-center py-10">Loading cart...</div>;

  if (cartItems.length === 0)
    return (
      <div className="text-center py-10 text-gray-500 flex justify-center flex-col items-center">
        <img src="/assets/emptycart.png" alt="Empty cart" />
        <p className="text-2xl mt-4">Oooops.... your cart is Empty</p>

        <div className="mt-10">
          <Link
            to={"/products"}
            className="bg-[#DB4444] text-white py-3 px-6 rounded-md hover:bg-[#C73A3A] transition"
          >
            Go to Shop
          </Link>
        </div>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-8 flex items-center gap-1">
        <span className="hover:text-gray-700 cursor-pointer">Home</span> /
        <span className="text-gray-800 font-medium">Cart</span>
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block overflow-x-auto mb-8">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left bg-gray-100">
              <th className="py-4 px-6">Product</th>
              <th className="py-4 px-6">Price</th>
              <th className="py-4 px-6">Quantity</th>
              <th className="py-4 px-6">Subtotal</th>
              <th className="py-4 px-6">Remove</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <CartItemRow
                key={item.id}
                item={item}
                updateItem={updateItem}
                removeItem={removeItem}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE LIST */}
      <div className="md:hidden">
        {cartItems.map((item) => (
          <CartItemRow
            key={item.id}
            item={item}
            updateItem={updateItem}
            removeItem={removeItem}
          />
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
        <Link to={"/products"} className="w-full sm:w-auto">
          <button className="w-full sm:w-auto border border-gray-400 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-100 transition">
            Return To Shop
          </button>
        </Link>

        <button className="w-full sm:w-auto border border-gray-400 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-100 transition">
          Update Cart
        </button>
      </div>

      {/* Cart Summary */}
      <div className="flex flex-col md:flex-row justify-between gap-10 mt-10">
        <div className="flex-1"></div>

        <div className="border border-gray-300 p-6 rounded-md w-full md:w-1/3 shadow-sm bg-white">
          <h3 className="text-lg font-semibold mb-4">Cart Total</h3>

          <div className="space-y-2 text-gray-700 text-sm">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span>Shipping:</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="flex justify-between font-semibold text-gray-800 mt-2">
              <span>Total:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            className="w-full bg-[#DB4444] text-white py-3 rounded-md mt-5 hover:bg-[#C73A3A] transition"
            onClick={() => navigate("/checkout", { state: { cartItems } })}
          >
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
