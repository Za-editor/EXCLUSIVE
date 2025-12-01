// src/pages/CartPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useCartQuery } from "../hooks/useCartQuery";
import {
  useUpdateCartItem,
  useRemoveCartItem,
} from "../hooks/useCartMutations";

// CartItemRow component
const CartItemRow = ({ item, updateItem, removeItem }) => {
  const [localQty, setLocalQty] = React.useState(item.quantity);

  React.useEffect(() => {
    setLocalQty(item.quantity);
  }, [item.quantity]);

  const handleBlur = () => {
    if (localQty < 1) return removeItem(item.id);
    if (localQty !== item.quantity) updateItem(item.id, localQty);
  };

  return (
    <tr className="border-b hover:bg-gray-50 transition">
      <td className="py-4 px-3 md:px-6 flex items-center gap-4">
        <img
          src={item.product_snapshot.image}
          alt={item.product_snapshot.title}
          className="w-16 h-16 rounded-md object-cover"
        />
        <div className="text-gray-800 font-medium">
          {item.product_snapshot.title}
        </div>
      </td>
      <td className="py-4 px-3 md:px-6 text-gray-700">
        ${item.product_snapshot.price.toFixed(2)}
      </td>
      <td className="py-4 px-3 md:px-6">
        <input
          type="number"
          min={1}
          value={localQty}
          onChange={(e) => setLocalQty(parseInt(e.target.value, 10) || 1)}
          onBlur={handleBlur}
          className="border border-gray-300 rounded-md px-3 py-1 w-20 text-sm"
        />
      </td>
      <td className="py-4 px-3 md:px-6 font-medium">
        ${(item.product_snapshot.price * localQty).toFixed(2)}
      </td>
      <td className="py-4 px-3 md:px-6">
        <button
          onClick={() => removeItem(item.id)}
          className="text-red-500 hover:text-red-700 font-medium"
        >
          Remove
        </button>
      </td>
    </tr>
  );
};

// Main CartPage component
const CartPage = () => {
  const { data: cartItems = [], isLoading } = useCartQuery();

  const updateCartMutation = useUpdateCartItem();
  const removeCartMutation = useRemoveCartItem();

  const updateItem = (itemId, qty) => {
    updateCartMutation.mutate({ itemId, qty });
  };

  const removeItem = (itemId) => {
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
            className="w-full bg-[#DB4444] text-white py-3 px-3 rounded-md mt-10 hover:bg-[#C73A3A] transition"
          >
            Go to Shop
          </Link>
        </div>
      </div>
    );

  return (
    <div className="container mx-auto px-4 md:px-0 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-8 flex items-center gap-1">
        <span className="hover:text-gray-700 cursor-pointer">Home</span> /
        <span className="text-gray-800 font-medium">Cart</span>
      </div>

      {/* Cart Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[600px]">
          <thead>
            <tr className="text-left bg-gray-100">
              <th className="py-4 px-3 md:px-6 font-medium text-gray-700">
                Product
              </th>
              <th className="py-4 px-3 md:px-6 font-medium text-gray-700">
                Price
              </th>
              <th className="py-4 px-3 md:px-6 font-medium text-gray-700">
                Quantity
              </th>
              <th className="py-4 px-3 md:px-6 font-medium text-gray-700">
                Subtotal
              </th>
              <th className="py-4 px-3 md:px-6 font-medium text-gray-700">
                Remove
              </th>
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

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
        <Link to={"/products"}>
          <button className="border border-gray-400 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-100 transition">
            Return To Shop
          </button>
        </Link>

        <button className="border border-gray-400 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-100 transition">
          Update Cart
        </button>
      </div>

      {/* Cart Summary */}
      <div className="flex flex-col md:flex-row justify-between gap-10 mt-10">
        <div></div>

        <div className="border border-gray-300 p-6 rounded-md w-full md:w-1/3">
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
          <button className="w-full bg-[#DB4444] text-white py-3 rounded-md mt-5 hover:bg-[#C73A3A] transition">
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
