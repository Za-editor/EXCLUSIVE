import React, { useState } from "react";
import {
  FaHeart,
  FaSearch,
  FaShoppingCart,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Top bar */}
      <div className="bg-black text-white text-sm md:text-base">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-2 py-2 px-4">
          <p className="text-center md:text-left">
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{" "}
            <strong className="underline cursor-pointer ml-2">ShopNow</strong>
          </p>
          <p className="cursor-pointer">English</p>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="border-b border-gray-200">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Brand */}
          <strong className="text-xl md:text-2xl font-bold">Exclusive</strong>

          {/* Hamburger Icon (Mobile) */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>

          {/* Nav Links (Desktop) */}
          <ul className="hidden md:flex gap-8 text-[16px]">
            <Link to={"/"}>
              <li className="underline cursor-pointer">Home</li>
            </Link>
            <Link to={"/contact"}>
              <li className="cursor-pointer hover:underline">Contact</li>
            </Link>
            <Link to={"/about"}>
              <li className="cursor-pointer hover:underline">About</li>
            </Link>
            <Link to={"/signup"}>
              <li className="cursor-pointer hover:underline">Sign Up</li>
            </Link>
          </ul>

          {/* Search & Icons */}
          <div className="hidden md:flex items-center gap-5">
            <div className="relative w-64">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="w-full py-2 px-4 pr-10 rounded-lg bg-gray-100 placeholder-gray-500 focus:outline-none"
              />
              <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
            </div>
            <FaHeart className="w-5 h-5 cursor-pointer" />
            <FaShoppingCart className="w-5 h-5 cursor-pointer" />
          </div>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <ul className="flex flex-col items-center gap-4 py-4 text-gray-700">
              <Link to={"/"}>
                <li className="underline">Home</li>
              </Link>
              <Link to={"/contact"}>
                <li>Contact</li>
              </Link>
              <Link to={"/about"}>
                <li>About</li>
              </Link>
              <Link to={"/signup"}>
                <li>Sign Up</li>
              </Link>
            </ul>
            <div className="px-4 pb-4 flex flex-col items-center gap-3">
              <div className="relative w-full max-w-sm">
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  className="w-full py-2 px-4 pr-10 rounded-lg bg-gray-100 placeholder-gray-500 focus:outline-none"
                />
                <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>
              <div className="flex gap-6 mt-2">
                <FaHeart className="w-5 h-5 cursor-pointer" />
                <FaShoppingCart className="w-5 h-5 cursor-pointer" />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
