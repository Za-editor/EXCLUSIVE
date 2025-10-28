import { FaGooglePlusG } from "react-icons/fa";


const SignUp = () => {
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

          <form className="space-y-5">
            <div>
              <input
                type="text"
                placeholder="Name"
                className="w-full border-b border-gray-300 focus:outline-none focus:border-gray-800 py-2"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Email or Phone Number"
                className="w-full border-b border-gray-300 focus:outline-none focus:border-gray-800 py-2"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full border-b border-gray-300 focus:outline-none focus:border-gray-800 py-2"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
            >
              Create Account
            </button>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md hover:bg-gray-50 transition"
            >
              <FaGooglePlusG className="text-xl" />
              <span className="text-sm text-gray-700">Sign up with Google</span>
            </button>

            <p className="text-center text-sm text-gray-600 mt-4">
              Already have account?{" "}
              <a href="#" className="text-gray-900 font-medium hover:underline">
                Log in
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
