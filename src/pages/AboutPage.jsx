import React from "react";
import ServiceFeatures from "../components/ServiceFeatures";
import { FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { Store, DollarSign, ShoppingBag, PiggyBank } from "lucide-react";

const staff = [
  {
    id: 1,
    name: "Tom Cruise",
    role: "Founder & Chairman",
    image: "/assets/Tomcruise.png",
  },
  {
    id: 2,
    name: "Emma Watson",
    role: "Managing Director",
    image: "/assets/emmawatson.png",
  },
  {
    id: 1,
    name: "Will Smith",
    role: "Product Design Head",
    image: "/assets/willSmith.png",
  },
];

const stats = [
  {
    id: 1,
    icon: <Store className="w-6 h-6 text-white" />,
    number: "10.5k",
    label: "Sellers active our site",
    active: false,
  },
  {
    id: 2,
    icon: <DollarSign className="w-6 h-6 text-white" />,
    number: "33k",
    label: "Monthly Product Sale",
    active: true, // red highlighted one
  },
  {
    id: 3,
    icon: <ShoppingBag className="w-6 h-6 text-white" />,
    number: "45.5k",
    label: "Customer active in our site",
    active: false,
  },
  {
    id: 4,
    icon: <PiggyBank className="w-6 h-6 text-white" />,
    number: "25k",
    label: "Annual gross sale in our site",
    active: false,
  },
];

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 md:px-0">
      <div className="text-sm text-gray-500 mt-5 md:mt-20 mb-5 md:mb-10">
        <span className="cursor-pointer hover:text-gray-700">Home</span> /{" "}
        <span className="text-gray-800 font-medium">About</span>
      </div>

      {/* About */}
      <div className="flex pt-10  gap-[129px]">
        {/* Left Section */}
        <div className="w-1/2 flex items-center justify-center px-10">
          <div className="w-full max-w-sm">
            <h2 className="text-[36px] font-semibold text-gray-900 mb-6">
              Our Story
            </h2>
            <p className="text-4 text-gray-600 mb-12">
              Launced in 2015, Exclusive is South Asia’s premier online shopping
              makterplace with an active presense in Bangladesh. Supported by
              wide range of tailored marketing, data and service solutions,
              Exclusive has 10,500 sallers and 300 brands and serves 3 millioons
              customers across the region.
            </p>
            <p className="text-4 text-gray-600 mb-12">
              Exclusive has more than 1 Million products to offer, growing at a
              very fast. Exclusive offers a diverse assotment in categories
              ranging from consumer.
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-1/2 flex items-center justify-center">
          <img
            src="/assets/aboutImg.png"
            alt="Shopping illustration"
            className="w-full"
          />
        </div>
      </div>
      {/* Stats */}
      <div className="w-full py-5 md:py-[140px] px-4 md:px-10 lg:px-20 bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center justify-center text-center rounded-md shadow-sm border border-gray-400 transition-all duration-300  text-black hover:shadow-md p-6"
            >
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-full mb-3  bg-black
                `}
              >
                {item.icon}
              </div>
              <h3
                className={`text-xl font-bold text-black
                `}
              >
                {item.number}
              </h3>
              <p
                className={`text-sm mt-1 
                text-gray-600`}
              >
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Team */}
      <div className="flex justify-center gap-10 mb-5 md:mb-15 flex-wrap flex-col md:flex-row">
        {staff.map((member) => (
          <div className="">
            <div className="w-[370px] h-[390px] bg-gray-200 px-[30px] pt-5 overflow-hidden flex justify-center">
              <img className=" " src={member.image} alt="" />
            </div>
            <p className="text-[32px] font-semibold">{member.name}</p>
            <p className="text-[16px] font-medium">{member.role}</p>
            <div className="flex gap-4 mt-3 text-gray-500">
              <FaTwitter size={20} className=" cursor-pointer" />
              <FaInstagram size={20} className=" cursor-pointer" />
              <FaLinkedinIn size={20} className=" cursor-pointer" />
            </div>
          </div>
        ))}
      </div>
      <ServiceFeatures />
    </div>
  );
};

export default AboutPage;
