import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  Search,
  ShoppingCart,
  X,
  User,
  LogOut,
  Heart,
  ShoppingBag,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { signOut } from "../services/auth";
import { supabase } from "../lib/supabase-client";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profile, setProfile] = useState(null);

  const { user } = useAuth();
  const navigate = useNavigate();

  // Fetch user profile from Supabase
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setProfile(null);
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("name")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Profile fetch error:", error.message);
        setProfile(null);
        return;
      }

      setProfile(data);
    };

    fetchProfile();
  }, [user]);

  // Logout handler
  const handleLogout = async () => {
    await signOut?.();
    setDropdownOpen(false);
    navigate("/login");
  };

  const firstName =profile?.name.split(" ")[0];

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
          <Link to={"/"}>
            <strong className="text-xl md:text-2xl font-bold cursor-pointer">
              Exclusive
            </strong>
          </Link>

          {/* Hamburger Icon (Mobile) */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>

          {/* Search Input (Desktop only) */}
          <div className="relative w-100 hidden md:block">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="w-full py-2 px-4 pr-10 rounded-lg bg-gray-100 placeholder-gray-500 focus:outline-none"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>

          {/* Icons + Account (Desktop only) */}
          <div className="hidden md:flex items-center gap-5 relative">
            <Link to={"/cart"}>
              <ShoppingCart className="cursor-pointer" />
            </Link>

            {/* Account Dropdown Button */}
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 text-gray-700 hover:text-black cursor-pointer"
            >
              <User />
              <span className="hidden md:inline font-medium">
                {firstName ? `Hi ${firstName}` : "Account"}
              </span>
              <ChevronDown
                className={`transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Account Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 top-10 w-48 bg-white shadow-lg border border-gray-100 rounded-md overflow-hidden z-50">
                {!user ? (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setDropdownOpen(false)}
                      className="block w-full text-center bg-orange-500 text-white py-2 font-medium hover:bg-orange-600 transition"
                    >
                      Sign In
                    </Link>
                    <div className="py-2">
                      <Link
                        to="/signup"
                        onClick={() => setDropdownOpen(false)}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                      >
                        Create Account
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="py-2">
                      <Link
                        to="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
                      >
                        <User size={16} />
                        {firstName || "My Account"}
                      </Link>

                      <Link
                        to="/orders"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
                      >
                        <ShoppingBag size={16} /> Orders
                      </Link>

                      <Link
                        to="/wishlist"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
                      >
                        <Heart size={16} /> Wishlist
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 text-gray-700 w-full text-left hover:bg-gray-50"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <ul className="flex flex-col items-center gap-4 py-4 text-gray-700">
              <Link to={"/"}>
                <li>Home</li>
              </Link>
              <Link to={"/contact"}>
                <li>Contact</li>
              </Link>
              <Link to={"/about"}>
                <li>About</li>
              </Link>
              {!user ? (
                <Link to={"/signup"}>
                  <li>Sign Up</li>
                </Link>
              ) : (
                <>
                  <Link to={"/profile"}>
                    <li>Account</li>
                  </Link>
                  <Link to={"/orders"}>
                    <li>Orders</li>
                  </Link>
                  <button onClick={handleLogout}>
                    <li>Logout</li>
                  </button>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
