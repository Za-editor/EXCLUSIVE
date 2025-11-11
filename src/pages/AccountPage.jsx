// src/pages/AccountPage.jsx
import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase-client";
import {
  MyAccount,
  AddressBook,
  PaymentOptions,
  MyWishlist,
  ProfileForm,
} from "../components/AccountSection";
import { useAuth } from "../hooks/useAuth";

const AccountPage = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      setLoading(true);

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error.message);
      } else if (data) {
        setFormData({
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          email: data.email || user.email || "",
          address: data.address || "",
          phone: data.phone || "",
          city: data.city || "",
          state: data.state || "",
          country: data.country || "",
          postal_code: data.postal_code || "",
        });
      }

      setLoading(false);
    };

    if (!authLoading && user) fetchProfile();
  }, [user, authLoading]);

  if (loading || authLoading) {
    return (
      <p className="text-center py-10 text-gray-500">Loading your account...</p>
    );
  }

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
          <span className="text-red-700 font-medium">
            {formData.first_name || formData.name || user.email?.split("@")[0]}
          </span>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col md:flex-row gap-10 md:gap-16 lg:gap-24 md:my-10">
        {/* Sidebar Menu */}
        <div className="w-full md:w-1/3 lg:w-1/4 bg-white md:bg-transparent rounded-lg p-5 md:p-0 shadow md:shadow-none">
          <p className="text-black text-lg font-semibold">Account Overview</p>
          <div className="text-gray-500 ml-4 md:ml-8 space-y-2 mt-2 mb-5">
            <p
              onClick={() => setActiveSection("overview")}
              className={`cursor-pointer hover:text-red-500 transition ${
                activeSection === "overview" ? "text-red-500" : ""
              }`}
            >
              My Account
            </p>
          </div>
          <p className="text-black text-lg font-semibold">Manage My Account</p>
          <div className="text-gray-500 ml-4 md:ml-8 space-y-2 mt-2 mb-5">
            <p
              onClick={() => setActiveSection("profile")}
              className={`cursor-pointer hover:text-red-500 transition ${
                activeSection === "profile" ? "text-red-500" : ""
              }`}
            >
              My Profile
            </p>
            <p
              onClick={() => setActiveSection("address")}
              className={`cursor-pointer hover:text-red-500 transition ${
                activeSection === "address" ? "text-red-500" : ""
              }`}
            >
              Address Book
            </p>
            <p
              onClick={() => setActiveSection("payment")}
              className={`cursor-pointer hover:text-red-500 transition ${
                activeSection === "payment" ? "text-red-500" : ""
              }`}
            >
              My Payment Options
            </p>
          </div>
          <p className="text-black text-lg font-semibold">My Wishlist</p>
          <div className="text-gray-500 ml-4 md:ml-8 space-y-2 mt-2 mb-5">
            <p
              onClick={() => setActiveSection("wishlist")}
              className={`cursor-pointer hover:text-red-500 transition ${
                activeSection === "wishlist" ? "text-red-500" : ""
              }`}
            >
              Wishlist
            </p>
          </div>
        </div>

        {/* Content Area */}
        <div className="w-full md:w-2/3 bg-white p-5 sm:p-8 md:p-10 rounded-lg shadow-md">
          {activeSection === "profile" && (
            <ProfileForm user={user} formData={formData} />
          )}
          {activeSection === "overview" && <MyAccount formData={formData} />}
          {activeSection === "address" && <AddressBook />}
          {activeSection === "payment" && <PaymentOptions />}
          {activeSection === "wishlist" && <MyWishlist />}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
