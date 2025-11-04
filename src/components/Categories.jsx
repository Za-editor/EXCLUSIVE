import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";


const categories = [
  { id: 1, name: "Phones", icon: "/assets/celphonecategorie.png", active: true },
  { id: 2, name: "Computers", icon: "/assets/computercategory.png" },
  { id: 3, name: "SmartWatch", icon: "/assets/smartwatchcategory.png" },
  { id: 4, name: "Camera", icon: "/assets/cameracategory.png", },
  { id: 5, name: "HeadPhones", icon: "/assets/headphonecategory.png" },
  { id: 6, name: "Gaming", icon: "/assets/gamingcategory.png" },
];
const Categories = () => {
  const scrollRef = useRef(null);
  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -250, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 250, behavior: "smooth" });
  };
  return (
    <div className="pt-20 pb-[70px] container mx-auto overflow-hidden border-b border-gray-200 ">
      {/* Tag */}
      <div className="flex items-center gap-4">
        <div className="w-5 h-10 bg-red-500 rounded-sm"></div>
        <span className="text-red-500 font-semibold text-[16px]">
          Categories
        </span>
      </div>

      {/* Header & Timer */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex flex-col md:flex-row items-start">
          <div className="flex gap-[150px] items-center">
            <h2 className="text-[36px] font-semibold text-gray-900">
              Browse By Categories
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
      <div className="w-full  overflow-hidden" ref={scrollRef}>
        <div className="grid grid-cols-6 gap-[30px] text-center mt-15">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className={`flex flex-col items-center justify-center gap-4 py-[25px] border rounded-sm border-gray-300 cursor-pointer transition-all duration-500
            ${
              cat.active
                ? "bg-red-500 text-white"
                : "bg-white hover:bg-gray-100 text-gray-700"
            }`}
            >
              <img src={cat.icon} alt={cat.name} className="" />
              <p className="text-sm font-medium">{cat.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
