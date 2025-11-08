import { FaGooglePlusG } from "react-icons/fa";
import { signInWithEmail, signInWithGoogle } from "../services/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Loin with Email and Password logic
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmail(email, password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Login with Google logic
  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex pt-10 pb-[140px] gap-[129px]">
      {/* Left Section */}
      <div className="w-1/2 flex items-center justify-center">
        <img
          src="/assets/sideImage.png"
          alt="Shopping illustration"
          className="w-full"
        />
      </div>

      {/* Right Section */}
      <div className="w-1/2 flex items-center justify-center px-10">
        <div className="w-full max-w-sm">
          <h2 className="text-[36px] font-semibold text-gray-900 mb-6">
            Log in to Exclusive
          </h2>
          <p className="text-4 text-gray-600 mb-12">Enter your details below</p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email or Phone Number"
                className="w-full border-b border-gray-300 focus:outline-none focus:border-gray-800 py-2"
              />
            </div>
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full border-b border-gray-300 focus:outline-none focus:border-gray-800 py-2"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-red-500 text-white px-8 py-2 rounded-md hover:bg-red-600 transition cursor-pointer"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
              <a href="#" className="text-red-500 text-sm hover:underline">
                Forget Password?
              </a>
            </div>
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md hover:bg-gray-50 transition"
            >
              <FaGooglePlusG className="text-xl" />
              <span className="text-sm text-gray-700">Login with Google</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
