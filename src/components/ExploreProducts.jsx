import React, {  useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ui/ProductCard";
import Button from "./ui/Button";

const products = [
  {
    id: 1,
    title: "The north coat",
    image: "/assets/north-coat.png",
    price: 260,
    oldPrice: 360,
    rating: 4.5,
    reviews: 65,
    discount: "-28%",
  },
  {
    id: 2,
    title: "Gucci duffle bag",
    image: "/assets/gucci-duffle-bag.png",
    price: 960,
    oldPrice: 1160,
    rating: 4.7,
    reviews: 65,
    discount: "-17%",
  },
  {
    id: 3,
    title: "RGB liquid CPU Cooler",
    image: "/assets/rgb-liquid-cooler.png",
    price: 160,
    oldPrice: 170,
    rating: 4.6,
    reviews: 65,
    discount: "-6%",
  },
  {
    id: 4,
    title: "Small BookSelf",
    image: "/assets/bookshelf.png",
    price: 360,
    oldPrice: 170,
    rating: 4.4,
    reviews: 65,
    discount: "-8%",
  },
  {
    id: 5,
    title: "HAVIT HV-G92 Gamepad",
    image: "/assets/gamepad.png",
    price: 120,
    oldPrice: 160,
    rating: 4.6,
    reviews: 88,
    discount: "-40%",
  },
  {
    id: 6,
    title: "AK–900 Wired Keyboard",
    image: "/assets/ak-900-keyboard.png",
    price: 960,
    oldPrice: 1160,
    rating: 4.5,
    reviews: 75,
    discount: "-35%",
  },
  {
    id: 7,
    title: "IPS LCD Gaming Monitor",
    image: "/assets/ips-monitor.png",
    price: 370,
    oldPrice: 400,
    rating: 4.7,
    reviews: 99,
    discount: "-30%",
  },
  {
    id: 8,
    title: "S-Series Comfort Chair",
    image: "/assets/comfort-chair.png",
    price: 375,
    oldPrice: 400,
    rating: 4.4,
    reviews: 99,
    discount: "-25%",
  },
];

const ExploreProducts = () => {


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
        <span className="text-red-500 font-semibold text-[16px]">Our Products</span>
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
        {products.map((item) => (
          <div key={item.id} className="snap-start shrink-0">
            <ProductCard item={item} />
          </div>
        ))}
      </div>
      <div
        ref={scrollRef2}
        className="mt-8 flex gap-[45px] overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory"
      >
        {products.map((item) => (
          <div key={item.id} className="snap-start shrink-0">
            <ProductCard item={item} />
          </div>
        ))}
      </div>
      <div className="mt-15 flex justify-center">
        <Button
          title="View All Products"
          classes=" bg-[#DB4444] text-white px-[48px] py-4 rounded-md hover:bg-[#DB4456] transition cursor-pointer duration-300"
        />
      </div>
    </div>
  );
};

export default ExploreProducts;
