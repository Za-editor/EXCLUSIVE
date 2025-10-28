const Login = () => {
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

          <form className="space-y-5">
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

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-red-500 text-white px-8 py-2 rounded-md hover:bg-red-600 transition"
              >
                Log In
              </button>
              <a href="#" className="text-red-500 text-sm hover:underline">
                Forget Password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
