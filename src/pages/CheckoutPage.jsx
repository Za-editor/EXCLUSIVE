// src/pages/CheckoutPage.jsx
import React from "react";
import { useCartQuery } from "../hooks/useCartQuery";
import { FaCcVisa, FaCcMastercard, FaCcPaypal } from "react-icons/fa";

const CheckoutPage = () => {
  const { data: cartItems = [], isLoading } = useCartQuery();

  // Calculate subtotal based on quantity and price
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product_snapshot.price * item.quantity,
    0
  );

  if (isLoading)
    return <div className="text-center py-10">Loading checkout...</div>;

  if (cartItems.length === 0)
    return (
      <div className="text-center py-10 text-gray-500 flex justify-center flex-col items-center">
        <p className="text-2xl mt-4">Your cart is empty</p>
      </div>
    );

  return (
    <div className="container mx-auto px-4 md:px-0 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-8 flex flex-wrap items-center gap-1">
        <span className="hover:text-gray-700 cursor-pointer">Account</span> /
        <span className="hover:text-gray-700 cursor-pointer">My Account</span> /
        <span className="hover:text-gray-700 cursor-pointer">Product</span> /
        <span className="hover:text-gray-700 cursor-pointer">View Cart</span> /
        <span className="text-gray-800 font-medium">CheckOut</span>
      </div>

      {/* Layout */}
      <div className="flex flex-col md:flex-row gap-10 md:gap-16 lg:gap-20">
        {/* Billing Details */}
        <div className="w-full md:w-2/3">
          <h2 className="text-2xl font-semibold mb-6">Billing Details</h2>
          <form className="space-y-5">
            {/* Input Fields */}
            <div>
              <label className="block text-gray-700 mb-2">
                First Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full bg-gray-100 rounded-md p-3 focus:outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Company Name</label>
              <input
                type="text"
                className="w-full bg-gray-100 rounded-md p-3 focus:outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">
                Street Address<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full bg-gray-100 rounded-md p-3 focus:outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">
                Apartment, floor, etc. (optional)
              </label>
              <input
                type="text"
                className="w-full bg-gray-100 rounded-md p-3 focus:outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">
                Town/City<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full bg-gray-100 rounded-md p-3 focus:outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">
                Phone Number<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full bg-gray-100 rounded-md p-3 focus:outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">
                Email Address<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                className="w-full bg-gray-100 rounded-md p-3 focus:outline-none text-sm"
              />
            </div>

            <div className="flex items-center mt-3">
              <input
                type="checkbox"
                id="saveInfo"
                className="w-4 h-4 accent-red-500"
              />
              <label htmlFor="saveInfo" className="ml-2 text-gray-700 text-sm">
                Save this information for faster check-out next time
              </label>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="w-full md:w-1/3 border-t md:border-t-0 pt-8 md:pt-0 md:pl-8">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
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
                  ${(item.product_snapshot.price * item.quantity).toFixed(2)}
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

            {/* Payment options */}
            <div className="space-y-2 mt-5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="payment" className="accent-red-500" />
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

            {/* Coupon Input */}
            <div className="flex flex-col sm:flex-row gap-3 mt-5">
              <input
                type="text"
                placeholder="Coupon Code"
                className="flex-1 bg-gray-100 rounded-md p-3 focus:outline-none text-sm"
              />
              <button className="bg-[#DB4444] text-white rounded-md px-5 py-3 hover:bg-[#C73A3A] transition">
                Apply Coupon
              </button>
            </div>

            {/* Place Order */}
            <button className="w-full bg-[#DB4444] text-white py-3 rounded-md mt-5 hover:bg-[#C73A3A] transition">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
