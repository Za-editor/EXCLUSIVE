// src/pages/SignUp.jsx
import { useState } from "react";
import { FaGooglePlusG } from "react-icons/fa";
import { signUpWithEmail, signInWithGoogle } from "../services/auth";

const SignUp = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUpWithEmail(form.email, form.password, form.name);
      alert("Account created! Check your email to verify.");
    } catch (err) {
      alert(err.message);
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
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Create an account
          </h2>
          <p className="text-sm text-gray-600 mb-6">Enter your details below</p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              className="w-full border-b border-gray-300 py-2 focus:border-gray-800 outline-none"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border-b border-gray-300 py-2 focus:border-gray-800 outline-none"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border-b border-gray-300 py-2 focus:border-gray-800 outline-none"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
            >
              Create Account
            </button>

            <button
              type="button"
              onClick={signInWithGoogle}
              className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md hover:bg-gray-50 transition"
            >
              <FaGooglePlusG className="text-xl" />
              <span className="text-sm text-gray-700">Sign up with Google</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
