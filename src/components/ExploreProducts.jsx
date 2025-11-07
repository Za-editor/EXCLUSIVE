import React, {  useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ui/ProductCard";
import Button from "./ui/Button";
import { Link } from "react-router-dom";



const ExploreProducts = ({data}) => {

const evenProducts = data.filter((_, index) => index % 2 === 0).slice(0, 10);
const oddProducts = data.filter((_, index) => index % 2 !== 0).slice(0, 10);
  const scrollRef = useRef(null);
  const scrollRef2 = useRef(null);



 

  // Carousel navigation
  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -250, behavior: "smooth" });
    scrollRef2.current.scrollBy({ left: -250, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 250, behavior: "smooth" });
    scrollRef2.current.scrollBy({ left: 250, behavior: "smooth" });
  };

  return (
    <div className="pt-[150px] pb-[87px] container mx-auto overflow-hidden ">
      {/* Tag */}
      <div className="flex items-center gap-4">
        <div className="w-5 h-10 bg-red-500 rounded-sm"></div>
        <span className="text-red-500 font-semibold text-[16px]">
          Our Products
        </span>
      </div>

      {/* Header & Timer */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex flex-col md:flex-row items-start">
          <div className="flex gap-[150px] items-center">
            <h2 className="text-[36px] font-semibold text-gray-900">
              Explore Our Products
            </h2>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={scrollLeft}
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition cursor-pointer"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={scrollRight}
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition cursor-pointer"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        className="mt-8 flex gap-[45px] overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory"
      >
        {evenProducts.map((item) => (
          <div key={item.id} className="snap-start shrink-0">
            <ProductCard item={item} showDiscount={false} />
          </div>
        ))}
      </div>
      <div
        ref={scrollRef2}
        className="mt-8 flex gap-[45px] overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory"
      >
        {oddProducts.map((item) => (
          <div key={item.id} className="snap-start shrink-0">
            <ProductCard item={item} showDiscount={false} />
          </div>
        ))}
      </div>
      <div className="mt-15 flex justify-center">
        <Link to="/products">
          <Button
            title="View All Products"
            classes=" bg-[#DB4444] text-white px-[48px] py-4 rounded-md hover:bg-[#DB4456] transition cursor-pointer duration-300"
          />
        </Link>
      </div>
    </div>
  );
};

export default ExploreProducts;
