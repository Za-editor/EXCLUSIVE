import React from "react";
import ProductCard from "./ui/ProductCard";
import Button from "./ui/Button";



const BestSelling = ({data}) => {
  return (
    <div className="pt-[150px] pb-[87px] container mx-auto overflow-hidden border-b border-gray-200 ">
      {/* Tag */}
      <div className="flex items-center gap-4">
        <div className="w-5 h-10 bg-red-500 rounded-sm"></div>
        <span className="text-red-500 font-semibold text-[16px]">
          This Month
        </span>
      </div>

      {/* Header & Timer */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex flex-col md:flex-row items-start">
          <div className="flex gap-[150px] items-center">
            <h2 className="text-[36px] font-semibold text-gray-900">
              Best Selling
            </h2>
          </div>
        </div>

        {/* View All */}
        <div className="flex items-center gap-3">
          <Button
            title="View All "
            classes=" bg-[#DB4444] text-white px-[48px] py-4 rounded-md hover:bg-[#DB4456] transition cursor-pointer duration-300"
          />
        </div>
      </div>

      {/* Products */}
      <div className="mt-8 flex gap-[45px] overflow-x-auto">
        {data.map((item) => (
          <div key={item.id} className="snap-start shrink-0">
            <ProductCard item={item} showDiscount={ false} />
          </div>
        ))}
      </div>

    </div>
  );
};

export default BestSelling;
