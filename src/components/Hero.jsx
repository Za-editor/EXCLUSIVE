import React, { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Hero = ({data}) => {
  const [current, setCurrent] = useState(0);
  const [openCategory, setOpenCategory] = useState(null);



  
  const categories = [
    {
      name: "Beauty & Personal Care",
      slug: "beauty-and-personal-care",
      children: [
        { name: "Beauty", slug: "beauty" },
        { name: "Skin Care", slug: "skin-care" },
        { name: "Fragrances", slug: "fragrances" },
      ],
    },
    {
      name: "Fashion",
      slug: "fashion",
      children: [
        { name: "Mens Shirts", slug: "mens-shirts" },
        { name: "Mens Shoes", slug: "mens-shoes" },
        { name: "Mens Watches", slug: "mens-watches" },
        { name: "Womens Dresses", slug: "womens-dresses" },
        { name: "Womens Shoes", slug: "womens-shoes" },
        { name: "Womens Watches", slug: "womens-watches" },
        { name: "Tops", slug: "tops" },
      ],
    },
    {
      name: "Accessories",
      slug: "accessories",
      children: [
        { name: "Womens Bags", slug: "womens-bags" },
        { name: "Womens Jewellery", slug: "womens-jewellery" },
        { name: "Sunglasses", slug: "sunglasses" },
      ],
    },
    {
      name: "Electronics & Gadgets",
      slug: "electronics-and-gadgets",
      children: [
        { name: "Smartphones", slug: "smartphones" },
        { name: "Laptops", slug: "laptops" },
        { name: "Tablets", slug: "tablets" },
        { name: "Mobile Accessories", slug: "mobile-accessories" },
      ],
    },
    {
      name: "Home & Living",
      slug: "home-and-living",
      children: [
        { name: "Furniture", slug: "furniture" },
        { name: "Home Decoration", slug: "home-decoration" },
        { name: "Kitchen Accessories", slug: "kitchen-accessories" },
      ],
    },
    {
      name: "Sports & Outdoors",
      slug: "sports-and-outdoors",
      children: [
        { name: "Sports Accessories", slug: "sports-accessories" },
        { name: "Motorcycle", slug: "motorcycle" },
      ],
    },
    {
      name: "Automotive",
      slug: "automotive",
      children: [{ name: "Vehicle", slug: "vehicle" }],
    },
    {
      name: "Groceries & Essentials",
      slug: "groceries-and-essentials",
      children: [{ name: "Groceries", slug: "groceries" }],
    },
  ];

  const toggleCategory = (index) => {
    setOpenCategory(openCategory === index ? null : index);
  };

  return (
    <section className="container mx-auto px-4 md:px-0">
      <div className="flex flex-col md:flex-row bg-white">
        {/* Sidebar (hidden on mobile) */}
        <aside className="hidden md:block md:w-1/5 border-r border-gray-200 px-6 py-6">
          <ul className="space-y-4 text-gray-700 text-sm md:text-base">
            {categories.map((cat, index) => (
              <li key={index}>
                <div
                  className="flex items-center justify-between hover:text-black cursor-pointer"
                  onClick={() => toggleCategory(index)}
                >
                  {cat.name}
                  <FaChevronRight
                    className={`text-xs transition-transform duration-300 ${
                      openCategory === index ? "rotate-90" : ""
                    }`}
                  />
                </div>

                {/* Child Categories */}
                {openCategory === index && (
                  <ul className="mt-2 ml-4 space-y-2 text-gray-500 text-sm transition-all duration-300">
                    {cat.children.map((child, i) => (
                      <li
                        key={i}
                        className="hover:text-gray-800 cursor-pointer"
                      >
                        <Link
                          to={`/category/${cat.slug}/${child.slug}`}
                          className="flex items-center gap-1"
                        >
                          • {child.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </aside>

        {/* Hero Section */}
        <div className="relative md:w-4/5 w-full bg-black mt-4 md:mt-5 text-white m-0 md:m-5 p-7 md:p-7 overflow-hidden">
          {/* Slide Wrapper */}
          <div className="relative h-[300px] sm:h-[400px] md:h-[420px] overflow-hidden">
            {data.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 flex flex-col md:flex-row items-center justify-between px-4 md:px-16 py-8 md:py-10 transition-opacity duration-700 ease-in-out ${
                  index === current ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                {/* Text Content */}
                <div className="max-w-lg text-center md:text-left mb-8 md:mb-0">
                  <div className="flex items-center justify-center md:justify-start gap-3 md:gap-6 mb-3">
                    <img
                      src={"/assets/apple.png"}
                      alt="Apple"
                      className="w-6 md:w-8"
                    />
                    <h4 className="text-sm text-gray-300">{slide.title}</h4>
                  </div>

                  <h1 className="text-[28px] sm:text-[36px] md:text-[48px] font-bold mb-4 leading-tight md:w-3/5 mx-auto md:mx-0">
                    Up to {(slide.discountPercentage).toFixed(0)}% off Voucher
                  </h1>

                  <Link
                    to={slide.link}
                    className="inline-flex items-center gap-2 border-b border-white hover:opacity-80"
                  >
                    Shop Now →
                  </Link>
                </div>

                {/* Product Image */}
                <div className="flex justify-center md:justify-end w-full md:w-auto">
                  <img
                    src={slide.images?.[0]}
                    alt={slide.title}
                    className="w-[220px] sm:w-[280px] md:w-[350px] object-contain"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {data.map((_, i) => (
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
