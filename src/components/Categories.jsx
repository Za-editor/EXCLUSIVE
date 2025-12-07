import { useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Smartphone,
  Laptop,
  FlaskRound,
  Heart,
  ShoppingBasket,
  Home,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

const categories = [
  { id: 1, name: "SmartPhones", link: "smartphones", icon: Smartphone },
  { id: 2, name: "Laptops", link: "laptops", icon: Laptop },
  { id: 3, name: "Fragrance", link: "fragrance", icon: FlaskRound },
  { id: 4, name: "Skincare", link: "skincare", icon: Heart },
  { id: 5, name: "Groceries", link: "groceries", icon: ShoppingBasket },
  { id: 6, name: "Home Decoration", link: "home-decoration", icon: Home },
];

const Categories = () => {
  const scrollRef = useRef(null);
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "smartphones";

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -250, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 250, behavior: "smooth" });
  };

  return (
    <div className="pt-14 md:pt-20 pb-12 container mx-auto overflow-hidden border-b border-gray-200">
      {/* Tag */}
      <div className="flex items-center gap-4">
        <div className="w-3 h-8 md:w-5 md:h-10 bg-red-500 rounded-sm" />
        <span className="text-red-500 font-semibold text-sm md:text-[16px]">
          Categories
        </span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mt-4">
        <h2 className="text-[24px] md:text-[36px] font-semibold text-gray-900">
          Browse By Categories
        </h2>

        {/* Buttons: Hide on mobile */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={scrollLeft}
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={scrollRight}
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Desktop Grid / Mobile Horizontal Scroll */}
      <div
        ref={scrollRef}
        className="
          mt-8 
          grid grid-cols-3 md:grid-cols-6 md:gap-[30px]
           md:block gap-4 overflow-x-auto md:overflow-visible 
          pb-4 
          snap-x snap-mandatory 
          scrollbar-hide 
          touch-pan-x 
          overscroll-x-contain
        "
      >
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.link;

          return (
            <Link
              key={cat.id}
              to={`/products?category=${cat.link}`}
              className={`
                snap-start shrink-0 w-[130px] md:w-auto 
                flex flex-col items-center justify-center gap-3 
                py-6 border rounded-sm border-gray-300 cursor-pointer 
                transition-all duration-300
                ${
                  isActive
                    ? "bg-red-500 text-white"
                    : "bg-white hover:bg-gray-100 text-gray-700"
                }
              `}
            >
              <Icon size={38} />
              <p className="text-sm font-medium">{cat.name}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
