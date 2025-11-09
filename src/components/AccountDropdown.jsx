import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, LogOut, Heart, ShoppingBag, ChevronDown } from "lucide-react";

const AccountDropdown = ({ profile, user, onLogout }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  
  if (!user) {
    console.log(profile);
      console.log(profile);
      console.log("Profile received in dropdown:", profile);
      console.log("Type:", typeof profile);
}



  const handleLogout = async () => {
    await onLogout?.();
    setOpen(false);
    navigate("/login"); // redirect after logout
  };


  return (
    <div className="relative">
      {/* Trigger button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-gray-700 hover:text-black cursor-pointer"
      >
        <User className="" />
        <span className="hidden md:inline  font-medium">Account</span>
        <ChevronDown
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg border border-gray-100 rounded-md overflow-hidden z-50">
          {!user ? (
            <>
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="block w-full text-center bg-orange-500 text-white py-2 font-medium hover:bg-orange-600 transition"
              >
                Sign In
              </Link>
              <div className="py-2">
                <Link
                  to="/signup"
                  onClick={() => setOpen(false)}
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
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
                >
                  <User size={16} />
                  {profile?.name || "My Account"}
                </Link>

                <Link
                  to="/orders"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
                >
                  <ShoppingBag size={16} /> Orders
                </Link>

                <Link
                  to="/wishlist"
                  onClick={() => setOpen(false)}
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
  );
};

export default AccountDropdown;
