import React from "react";
import Button from "../components/ui/Button";

const AccountPage = () => {
  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-16">
      {/* Breadcrumb & Welcome */}
      <div className="text-sm text-gray-500 mt-5 md:mt-20 mb-5 md:mb-10 flex flex-col md:flex-row md:justify-between md:items-center gap-2">
        <div>
          <span className="cursor-pointer hover:text-gray-700">Home</span> /
          <span className="text-gray-800 font-medium"> My Account</span>
        </div>
        <div>
          <span className="cursor-pointer hover:text-gray-700 text-black">
            Welcome!{" "}
          </span>
          <span className="text-red-700 font-medium">Md Fawas</span>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col md:flex-row gap-10 md:gap-16 lg:gap-24 md:my-10">
        {/* Sidebar Menu */}
        <div className="w-full md:w-1/3 lg:w-1/4 bg-white md:bg-transparent rounded-lg p-5 md:p-0 shadow md:shadow-none">
          {/* Manage account */}
          <p className="text-black text-lg font-semibold">Manage My Account</p>
          <div className="text-gray-500 ml-4 md:ml-8 space-y-2 mt-2 mb-5">
            <p className="text-red-500 cursor-pointer">My Profile</p>
            <p className="cursor-pointer hover:text-red-500 transition">
              Address Book
            </p>
            <p className="cursor-pointer hover:text-red-500 transition">
              My Payment Options
            </p>
          </div>

          {/* Orders */}
          <p className="text-black text-lg font-semibold">My Orders</p>
          <div className="text-gray-500 ml-4 md:ml-8 space-y-2 mt-2 mb-5">
            <p className="cursor-pointer hover:text-red-500 transition">
              My Returns
            </p>
            <p className="cursor-pointer hover:text-red-500 transition">
              My Cancellations
            </p>
          </div>

          {/* Wishlist */}
          <p className="text-black text-lg font-semibold">My Wishlist</p>
        </div>

        {/* Profile Form */}
        <div className="w-full md:w-2/3 bg-white p-5 sm:p-8 md:p-10 rounded-lg shadow-md">
          <h2 className="text-lg text-red-500 font-semibold mb-6">
            Edit Your Profile
          </h2>
          <form>
            {/* Name Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  placeholder="Fawas"
                  className="bg-gray-100 rounded-md p-3 focus:outline-none w-full text-sm"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  placeholder="Md"
                  className="bg-gray-100 rounded-md p-3 focus:outline-none w-full text-sm"
                />
              </div>
            </div>

            {/* Email & Address */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  className="bg-gray-100 rounded-md p-3 focus:outline-none w-full text-sm"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Address</label>
                <input
                  type="text"
                  placeholder="Kingston 223, Abuja, Nigeria"
                  className="bg-gray-100 rounded-md p-3 focus:outline-none w-full text-sm"
                />
              </div>
            </div>

            {/* Password Change */}
            <div className="mt-6 space-y-5">
              <label className="block text-gray-700 mb-2">
                Password Changes
              </label>
              <input
                type="password"
                placeholder="Current Password"
                className="bg-gray-100 rounded-md p-3 focus:outline-none w-full text-sm"
              />
              <input
                type="password"
                placeholder="New Password"
                className="bg-gray-100 rounded-md p-3 focus:outline-none w-full text-sm"
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                className="bg-gray-100 rounded-md p-3 focus:outline-none w-full text-sm"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-4 mt-6">
              <button
                type="button"
                className="text-gray-600 hover:text-gray-400 transition"
              >
                Cancel
              </button>
              <Button
                title="Save Changes"
                classes="bg-[#DB4444] text-white px-6 py-3 rounded-md hover:bg-[#DB4456] transition duration-300"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
