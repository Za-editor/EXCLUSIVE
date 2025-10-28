import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-black">
      <footer className="text-white pt-20 pb-15 container mx-auto px-4 md:px-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {/* Exclusive / Subscribe */}
          <div>
            <h2 className="text-[24px] font-bold mb-6">Exclusive</h2>
            <p className="mb-6 text-[20px]">Subscribe</p>
            <p className="text-gray-400 text-[16px] mb-4">
              Get 10% off your first order
            </p>
            <div className="flex items-center border border-gray-500 rounded overflow-hidden w-10/12">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent text-sm px-3 py-2 outline-none w-full"
              />
              <button className=" text-white px-4 py-2 hover:bg-gray-200 transition">
                ➤
              </button>
            </div>
          </div>

          {/* Support */}
          <div>
            <h2 className="text-[24px] font-bold mb-6">Support</h2>
            <p className="text-[16px] mb-4 text-gray-400">
              111 Bijoy sarani, Dhaka,
              <br /> DH 1515, Bangladesh.
            </p>
            <p className="text-[16px] mb-4 text-gray-400">
              exclusive@gmail.com
            </p>
            <p className="text-[16px] text-gray-400">+234 810 5709 670</p>
          </div>

          {/* Account */}
          <div>
            <h2 className="text-[24px] font-bold mb-6">Account</h2>
            <ul className="text-[16px] space-y-4 text-gray-400">
              <li className="">My Account</li>
              <li>Login / Register</li>
              <li>Cart</li>
              <li>Wishlist</li>
              <li>Shop</li>
            </ul>
          </div>

          {/* Quick Link */}
          <div>
            <h2 className="text-[24px] font-bold mb-6">Quick Link</h2>
            <ul className="text-[16px] space-y-4 text-gray-400">
              <li>Privacy Policy</li>
              <li>Terms Of Use</li>
              <li>FAQ</li>
              <li>Contact</li>
            </ul>
          </div>

          {/* Download App */}
          <div>
            <h2 className="text-[24px] font-bold mb-6">Download App</h2>
            <p className="text-gray-400 text-sm mb-2">
              Save $3 with App New User Only
            </p>
            <div className="flex items-center gap-3 mb-4">
              <img src="/assets/frame.png" alt="QR" className="w-16 h-16" />
              <div className="flex flex-col gap-2">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Google Play"
                  className="w-28"
                />
                <img
                  src="/assets/appstore.png"
                  alt="App Store"
                  className="w-28"
                />
              </div>
            </div>
            <div className="flex gap-4 text-gray-400 text-lg">
              <FaFacebook className="hover:text-white cursor-pointer" />
              <FaTwitter className="hover:text-white cursor-pointer" />
              <FaInstagram className="hover:text-white cursor-pointer" />
              <FaLinkedin className="hover:text-white cursor-pointer" />
            </div>
          </div>
        </div>
      </footer>
      {/* Bottom line */}
      <div className="border-t border-gray-800 mt-10 pt-4 pb-6 text-center text-gray-700 text-[16px]">
        © Copyright Xa_Plug 2025. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
