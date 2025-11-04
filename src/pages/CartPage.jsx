import React from "react";

const CartPage = () => {
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
            </tr>
          </thead>
          <tbody>
            {/* Item 1 */}
            <tr className="border-b hover:bg-gray-50 transition">
              <td className="py-4 px-3 md:px-6 flex items-center gap-4">
                <img
                  src="/assets/ips-monitor.png"
                  alt="LCD Monitor"
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div className="text-gray-800 font-medium">LCD Monitor</div>
              </td>
              <td className="py-4 px-3 md:px-6 text-gray-700">$650</td>
              <td className="py-4 px-3 md:px-6">
                <select className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none text-sm">
                  <option>01</option>
                  <option>02</option>
                  <option>03</option>
                </select>
              </td>
              <td className="py-4 px-3 md:px-6 font-medium">$650</td>
            </tr>

            {/* Item 2 */}
            <tr className="border-b hover:bg-gray-50 transition">
              <td className="py-4 px-3 md:px-6 flex items-center gap-4">
                <img
                  src="/assets/gamepad.png"
                  alt="HI Gamepad"
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div className="text-gray-800 font-medium">HI Gamepad</div>
              </td>
              <td className="py-4 px-3 md:px-6 text-gray-700">$550</td>
              <td className="py-4 px-3 md:px-6">
                <select className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none text-sm">
                  <option>01</option>
                  <option selected>02</option>
                  <option>03</option>
                </select>
              </td>
              <td className="py-4 px-3 md:px-6 font-medium">$1100</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Buttons Row */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
        <button className="border border-gray-400 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-100 transition">
          Return To Shop
        </button>
        <button className="border border-gray-400 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-100 transition">
          Update Cart
        </button>
      </div>

      {/* Coupon & Total Section */}
      <div className="flex flex-col md:flex-row justify-between gap-10 mt-10">
        {/* Coupon Input */}
        <div className="">
          <div className="flex flex-col sm:flex-row gap-3 w-full ">
            <input
              type="text"
              placeholder="Coupon Code"
              className="flex-1 border border-gray-300 rounded-md px-4 py-3 focus:outline-none text-sm"
            />
            <button className="bg-[#DB4444] text-white px-6 py-3 rounded-md hover:bg-[#C73A3A] transition">
              Apply Coupon
            </button>
          </div>
        </div>

        {/* Cart Total */}
        <div className="border border-gray-300 p-6 rounded-md w-full md:w-1/3">
          <h3 className="text-lg font-semibold mb-4">Cart Total</h3>
          <div className="space-y-2 text-gray-700 text-sm">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>$1750</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span>Shipping:</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="flex justify-between font-semibold text-gray-800 mt-2">
              <span>Total:</span>
              <span>$1750</span>
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
