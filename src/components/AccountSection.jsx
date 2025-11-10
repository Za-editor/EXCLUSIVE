import React, { useState } from "react";
import Button from "../components/ui/Button";
import { supabase } from "../lib/supabase-client";
import { useAuth } from "../hooks/useAuth";

//   MY PROFILE
export const ProfileForm = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
      first_name: "",
      last_name: "",
      email: "",
      address: "",
      phone: "",
      city: "",
      state: "",
      country: "",
      postal_code: "",
    });

    //Handle Change
    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({...prev, [name]: value}))
    } 

    // Handle save
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!user) return;
        setLoading(true);

        const { error } = await supabase.from("profiles").upsert({
            id: user.id,
            ...formData,
            updated_at: new Date()
        })
        setLoading(false);

        if (error) {
            console.error("Error updating profile", error.message);
            alert("Error updating profile")
            
        } else {
            alert("Profile updated successfully")
        }
    }

    if(loading) return <p>Loading ...</p> 
  return (
    <div className="">
      <h2 className="text-lg text-red-500 font-semibold mb-6">
        Edit Your Profile
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Name Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.first_name}
              onChange={handleChange}
              className="bg-gray-100 rounded-md p-3 focus:outline-none w-full text-sm"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.last_name}
              onChange={handleChange}
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
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-100 rounded-md p-3 focus:outline-none w-full text-sm"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="bg-gray-100 rounded-md p-3 focus:outline-none w-full text-sm"
            />
          </div>
        </div>

        {/* Phone, City, State, Country, Postal Code */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
          <div>
            <label className="block text-gray-700 mb-2">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="bg-gray-100 rounded-md p-3 focus:outline-none w-full text-sm"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="bg-gray-100 rounded-md p-3 focus:outline-none w-full text-sm"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">State/Province</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="bg-gray-100 rounded-md p-3 focus:outline-none w-full text-sm"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="bg-gray-100 rounded-md p-3 focus:outline-none w-full text-sm"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Postal Code</label>
            <input
              type="text"
              name="postalCode"
              value={formData.postal_code}
              onChange={handleChange}
              className="bg-gray-100 rounded-md p-3 focus:outline-none w-full text-sm"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="text-gray-600 hover:text-gray-400 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#DB4444] text-white px-6 py-3 rounded-md hover:bg-[#DB4456] transition duration-300"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};
//   MY ACCOUNT

export const MyAccount = ({ profile }) => {
  return (
    <div className="">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Account Overview
      </h2>

      <div className="grid md:grid-cols-2 gap-4 text-gray-700">
        {/* Full Name */}
        <div>
          <p className="font-medium">Full Name</p>
          <p className="bg-gray-50 p-2 rounded-md mt-1">
            {profile?.name || "—"}
          </p>
        </div>

        {/* Email */}
        <div>
          <p className="font-medium">Email</p>
          <p className="bg-gray-50 p-2 rounded-md mt-1">
            {profile?.email || "—"}
          </p>
        </div>

        {/* Phone */}
        <div>
          <p className="font-medium">Phone Number</p>
          <p className="bg-gray-50 p-2 rounded-md mt-1">
            {profile?.phone || "—"}
          </p>
        </div>

        {/* Gender */}
        <div>
          <p className="font-medium">Gender</p>
          <p className="bg-gray-50 p-2 rounded-md mt-1">
            {profile?.gender || "—"}
          </p>
        </div>

        {/* Date of Birth */}
        <div>
          <p className="font-medium">Date of Birth</p>
          <p className="bg-gray-50 p-2 rounded-md mt-1">
            {profile?.dob || "—"}
          </p>
        </div>

        {/* Address */}
        <div>
          <p className="font-medium">Address</p>
          <p className="bg-gray-50 p-2 rounded-md mt-1">
            {profile?.address || "—"}
          </p>
        </div>

        {/* City */}
        <div>
          <p className="font-medium">City</p>
          <p className="bg-gray-50 p-2 rounded-md mt-1">
            {profile?.city || "—"}
          </p>
        </div>

        {/* State */}
        <div>
          <p className="font-medium">State/Province</p>
          <p className="bg-gray-50 p-2 rounded-md mt-1">
            {profile?.state || "—"}
          </p>
        </div>

        {/* Country */}
        <div>
          <p className="font-medium">Country</p>
          <p className="bg-gray-50 p-2 rounded-md mt-1">
            {profile?.country || "—"}
          </p>
        </div>

        {/* Postal Code */}
        <div>
          <p className="font-medium">Postal Code</p>
          <p className="bg-gray-50 p-2 rounded-md mt-1">
            {profile?.postalCode || "—"}
          </p>
        </div>


      </div>
    </div>
  );
};


//ADDRESS BOOK

export const AddressBook = () => {
  return (
    <div className="">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Address Book</h2>
      <form className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Street Address
          </label>
          <input
            type="text"
            placeholder="123 Main Street"
            className="w-full p-2 bg-gray-100 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">City</label>
          <input
            type="text"
            placeholder="Abuja"
            className="w-full p-2 bg-gray-100 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">State</label>
          <input
            type="text"
            placeholder="FCT"
            className="w-full p-2 bg-gray-100 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Country</label>
          <input
            type="text"
            placeholder="Nigeria"
            className="w-full p-2 bg-gray-100 rounded-md"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">Postal Code</label>
          <input
            type="text"
            placeholder="100001"
            className="w-full p-2 bg-gray-100 rounded-md"
          />
        </div>

        <div className="col-span-2 flex justify-end gap-4 mt-4">
          <button type="button" className="text-gray-700">
            Cancel
          </button>
          <button
            type="submit"
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Save Address
          </button>
        </div>
      </form>
    </div>
  );
};

// PAYMENT OPTIONS

export const PaymentOptions = () => {
  return (
    <div className="">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        My Payment Options
      </h2>
      <form className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Cardholder Name
          </label>
          <input
            type="text"
            placeholder="Fawas Md"
            className="w-full p-2 bg-gray-100 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Card Number</label>
          <input
            type="text"
            placeholder="1234 5678 9012 3456"
            className="w-full p-2 bg-gray-100 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Expiry Date</label>
          <input
            type="text"
            placeholder="MM/YY"
            className="w-full p-2 bg-gray-100 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">CVV</label>
          <input
            type="password"
            placeholder="***"
            className="w-full p-2 bg-gray-100 rounded-md"
          />
        </div>

        <div className="col-span-2 flex justify-end gap-4 mt-4">
          <button type="button" className="text-gray-700">
            Cancel
          </button>
          <button
            type="submit"
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Save Payment Option
          </button>
        </div>
      </form>
    </div>
  );
};

//  MY WISHLIST

export const MyWishlist = ({ wishlist = [] }) => {
  return (
    <div className="">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">My Wishlist</h2>

      {wishlist.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg overflow-hidden shadow-sm"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-3">
                <h3 className="font-medium text-gray-800 truncate">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500">${item.price}</p>
                <button className="mt-2 bg-red-500 text-white px-3 py-1 text-sm rounded-md hover:bg-red-600">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
