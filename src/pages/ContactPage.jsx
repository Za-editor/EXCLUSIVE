import React from "react";
import { Phone, Mail } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="w-full bg-white  pt-10 pb-20 px-4 container mx-auto">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        <span className="cursor-pointer hover:text-gray-700">Home</span> /{" "}
        <span className="text-gray-800 font-medium">Contact</span>
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-20 mt-5 md:mt-20">
        {/* Left Section */}
        <div className="col-span-1 bg-white shadow-md rounded-2xl p-6 flex flex-col justify-between">
          {/* Call To Us */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-red-500 p-3 rounded-full text-white">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="text-gray-900 font-semibold text-lg">
                Call To Us
              </h3>
            </div>
            <p className="text-gray-600 text-sm mb-2">
              We are available 24/7, 7 days a week.
            </p>
            <p className="text-gray-800 font-medium text-sm">
              Phone: +234 810 5709 670
            </p>
            <hr className="border-gray-200 my-5" />
          </div>

          {/* Write To Us */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-red-500 p-3 rounded-full text-white">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="text-gray-900 font-semibold text-lg">
                Write To Us
              </h3>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              Fill out our form and we will contact you within 24 hours.
            </p>
            <div className="space-y-1">
              <p className="text-gray-800 text-sm">
                Email: customer@exclusive.com
              </p>
              <p className="text-gray-800 text-sm">
                Email: support@exclusive.com
              </p>
            </div>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="col-span-2 bg-white shadow-md rounded-2xl p-6">
          <form className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Your Name *"
                className="bg-gray-200 rounded-md p-3 focus:outline-none  placeholder-gray-400 text-sm"
              />
              <input
                type="email"
                placeholder="Your Email *"
                className="bg-gray-200 rounded-md p-3 focus:outline-none  placeholder-gray-400 text-sm"
              />
              <input
                type="text"
                placeholder="Your Phone *"
                className="bg-gray-200 rounded-md p-3 focus:outline-none  placeholder-gray-400 text-sm"
              />
            </div>

            <textarea
              rows="6"
              placeholder="Your Message"
              className="bg-gray-200 rounded-md p-3 focus:outline-none  placeholder-gray-400 text-sm"
            ></textarea>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-3 rounded-md transition-all duration-300 cursor-pointer"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
