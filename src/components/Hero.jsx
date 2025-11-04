import React, { useState } from "react";
import { FaChevronRight } from "react-icons/fa";

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const slides = [
    {
      id: 1,
      image: "/assets/Iphone.png",
      title: "iPhone 14 Series",
      discount: "Up to 10% off Voucher",
      link: "#",
    },
    {
      id: 2,
      image: "/assets/Iphone.png",
      title: "iPhone 14 Series",
      discount: "Up to 10% off Voucher",
      link: "#",
    },
  ];

  const categories = [
    "Woman’s Fashion",
    "Men’s Fashion",
    "Electronics",
    "Home & Lifestyle",
    "Medicine",
    "Sports & Outdoor",
    "Baby’s & Toys",
    "Groceries & Pets",
    "Health & Beauty",
  ];

  return (
    <section className="container mx-auto px-4 md:px-0">
      <div className="flex flex-col md:flex-row bg-white">
        {/* Sidebar (hidden on mobile) */}
        <aside className="hidden md:block md:w-1/5 border-r border-gray-200 px-6 py-6">
          <ul className="space-y-4 text-gray-700 text-sm md:text-base">
            {categories.map((cat, index) => (
              <li
                key={index}
                className="flex items-center justify-between hover:text-black cursor-pointer"
              >
                {cat} <FaChevronRight className="text-xs" />
              </li>
            ))}
          </ul>
        </aside>

        {/* Hero Section */}
        <div className="relative md:w-4/5 w-full bg-black mt-4 md:mt-5 text-white m-0 md:m-5 p-7 md:p-7  overflow-hidden">
          {/* Slide Wrapper */}
          <div className="relative h-[300px] sm:h-[400px] md:h-[420px] overflow-hidden">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 flex flex-col md:flex-row items-center justify-between px-4 md:px-16 py-8 md:py-10 transition-opacity duration-700 ease-in-out ${
                  index === current ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                {/* Text Content */}
                <div className="max-w-lg text-center md:text-left mb-8 md:mb-0">
                  <div className="flex items-center justify-center md:justify-start gap-3 md:gap-6 mb-3">
                    <img
                      src="/assets/apple.png"
                      alt="Apple"
                      className="w-6 md:w-8"
                    />
                    <h4 className="text-sm text-gray-300">{slide.title}</h4>
                  </div>

                  <h1 className="text-[28px] sm:text-[36px] md:text-[48px] font-bold mb-4 leading-tight md:w-3/5 mx-auto md:mx-0">
                    {slide.discount}
                  </h1>

                  <a
                    href={slide.link}
                    className="inline-flex items-center gap-2 border-b border-white hover:opacity-80"
                  >
                    Shop Now →
                  </a>
                </div>

                {/* Product Image */}
                <div className="flex justify-center md:justify-end w-full md:w-auto">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-[220px] sm:w-[280px] md:w-[350px] object-contain"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === current ? "bg-gray-300 scale-110" : "bg-gray-600"
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
