import React from "react";
import { Truck, Headphones, ShieldCheck } from "lucide-react"; // using lucide-react icons

const ServiceFeatures = () => {
  return (
    <div className="w-full py-20 bg-white flex flex-col items-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[200px] text-center">
        {/* Free and Fast Delivery */}
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-16 h-16 bg-black rounded-full relative">
            <div className="absolute inset-0 rounded-full border-4 border-gray-200 -z-10"></div>
            <Truck className="text-white w-7 h-7" />
          </div>
          <h3 className="text-sm font-bold uppercase mt-4">
            Free and Fast Delivery
          </h3>
          <p className="text-gray-500 text-sm mt-1">
            Free delivery for all orders over $140
          </p>
        </div>

        {/* 24/7 Customer Service */}
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-16 h-16 bg-black rounded-full relative">
            <div className="absolute inset-0 rounded-full border-4 border-gray-200 -z-10"></div>
            <Headphones className="text-white w-7 h-7" />
          </div>
          <h3 className="text-sm font-bold uppercase mt-4">
            24/7 Customer Service
          </h3>
          <p className="text-gray-500 text-sm mt-1">
            Friendly 24/7 customer support
          </p>
        </div>

        {/* Money Back Guarantee */}
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-16 h-16 bg-black rounded-full relative">
            <div className="absolute inset-0 rounded-full border-4 border-gray-200 -z-10"></div>
            <ShieldCheck className="text-white w-7 h-7" />
          </div>
          <h3 className="text-sm font-bold uppercase mt-4">
            Money Back Guarantee
          </h3>
          <p className="text-gray-500 text-sm mt-1">
            We return money within 30 days
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServiceFeatures;
