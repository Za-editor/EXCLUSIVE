// src/pages/CheckoutPage.jsx
import { useState } from "react";
import { useCartQuery } from "../hooks/useCartQuery";
import { useCreateOrder } from "../hooks/useOrderMutations";
import { FaCcVisa, FaCcMastercard, FaCcPaypal } from "react-icons/fa";
import { Link } from "react-router-dom";

const CheckoutPage = () => {
  const { data: cartItems = [], isLoading } = useCartQuery();
  const createOrder = useCreateOrder();

  // UI state
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderData, setOrderData] = useState(null);

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product_snapshot.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    try {
      const order = await createOrder.mutateAsync({
        cartItems,
        totalAmount: subtotal,
      });

      setOrderData({
        id: order.id,
        date: new Date(order.created_at).toLocaleString(),
        items: cartItems,
        subtotal,
        total: subtotal,
      });

      setShowSuccess(true);
    } catch (error) {
      console.error("Order failed:", error);
      alert("Error placing order.");
    }
  };

  if (isLoading)
    return <div className="text-center py-10">Loading checkout...</div>;

  if (cartItems.length === 0 && !showSuccess)
    return (
      <div className="text-center py-10 text-gray-500 flex justify-center flex-col items-center">
        <p className="text-2xl mt-4">Your cart is empty</p>
      </div>
    );

  return (
    <div className="relative">
      {/* Loading Overlay */}
      {createOrder.isPending && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="loader mx-auto mb-4"></div>
            <p className="text-lg font-medium">Processing your order...</p>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && orderData && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white p-7 rounded-lg shadow-xl max-w-md w-full">
            <h2 className="text-2xl font-semibold text-green-600 text-center">
              Order Placed Successfully!
            </h2>

            <div className="mt-5 text-gray-700 space-y-3">
              <p>
                <span className="font-semibold">Order ID:</span> #{orderData.id}
              </p>
              <p>
                <span className="font-semibold">Date:</span> {orderData.date}
              </p>

              <div className="border-t pt-3 space-y-2">
                <h3 className="font-semibold text-lg">Items:</h3>

                {orderData.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center text-sm"
                  >
                    <span>
                      {item.product_snapshot.title} x {item.quantity}
                    </span>
                    <span>
                      $
                      {(
                        item.product_snapshot.price * item.quantity
                      ).toFixed(2)}
                    </span>
                  </div>
                ))}

                <div className="border-t pt-3 text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span>${orderData.subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping:</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>

                  <div className="flex justify-between font-semibold text-gray-800 border-t pt-2">
                    <span>Total:</span>
                    <span>${orderData.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-6">
              <Link
                to="/"
                onClick={() => setShowSuccess(false)}
                className="bg-[#DB4444] text-white px-5 py-2 rounded-md hover:bg-[#C73A3A] transition"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Page Container */}
      {!showSuccess && (
        <div className="container mx-auto px-4 md:px-0 py-8">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-500 mb-8 flex flex-wrap items-center gap-1">
            <span className="hover:text-gray-700 cursor-pointer">Account</span> /
            <span className="hover:text-gray-700 cursor-pointer">My Account</span>{" "}
            /<span className="hover:text-gray-700 cursor-pointer">Product</span> /
            <span className="hover:text-gray-700 cursor-pointer">View Cart</span>{" "}
            /<span className="text-gray-800 font-medium">CheckOut</span>
          </div>

          <div className="flex flex-col md:flex-row gap-10 md:gap-16 lg:gap-20">
            {/* Billing Form */}
            <div className="w-full md:w-2/3">
              <h2 className="text-2xl font-semibold mb-6">Billing Details</h2>
              <form className="space-y-5">
                <div>
                  <label className="block text-gray-700 mb-2">
                    First Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-100 rounded-md p-3 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Company Name</label>
                  <input
                    type="text"
                    className="w-full bg-gray-100 rounded-md p-3 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    Street Address<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-100 rounded-md p-3 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    Apartment, floor, etc. (optional)
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-100 rounded-md p-3 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    Town/City<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-100 rounded-md p-3 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    Phone Number<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-100 rounded-md p-3 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    Email Address<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    className="w-full bg-gray-100 rounded-md p-3 text-sm"
                  />
                </div>

                <div className="flex items-center mt-3">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-red-500"
                    id="saveInfo"
                  />
                  <label
                    htmlFor="saveInfo"
                    className="ml-2 text-gray-700 text-sm"
                  >
                    Save this information for faster check-out next time
                  </label>
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div className="w-full md:w-1/3 border-t md:border-t-0 pt-8 md:pt-0 md:pl-8">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.product_snapshot.image}
                        alt={item.product_snapshot.title}
                        className="w-12 h-12 rounded-md object-cover"
                      />
                      <span className="text-gray-700">
                        {item.product_snapshot.title} x {item.quantity}
                      </span>
                    </div>
                    <span className="font-medium">
                      $
                      {(
                        item.product_snapshot.price * item.quantity
                      ).toFixed(2)}
                    </span>
                  </div>
                ))}

                {/* Totals */}
                <div className="border-t border-gray-200 mt-4 pt-4 space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping:</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  <div className="flex justify-between font-semibold text-gray-800 border-t pt-2">
                    <span>Total:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Payment */}
                <div className="space-y-2 mt-5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      className="accent-red-500"
                    />
                    <span>Bank</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      defaultChecked
                      className="accent-red-500"
                    />
                    <span>Cash on delivery</span>
                  </label>

                  <div className="flex items-center gap-3 mt-2 text-gray-500 text-xl">
                    <FaCcVisa />
                    <FaCcMastercard />
                    <FaCcPaypal />
                  </div>
                </div>

                {/* Place Order */}
                <button
                  onClick={handlePlaceOrder}
                  className="w-full bg-[#DB4444] text-white py-3 rounded-md mt-5 hover:bg-[#C73A3A] transition"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Spinner CSS */}
      <style>
        {`
        .loader {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #DB4444;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
      </style>
    </div>
  );
};

export default CheckoutPage;
