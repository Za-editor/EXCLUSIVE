import React, { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ui/ProductCard";
import Button from "./ui/Button";

const FlashSales = ({ data }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 23,
    minutes: 19,
    seconds: 56,
  });

  const scrollRef = useRef(null);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const format = (val) => val.toString().padStart(2, "0");

  // Carousel navigation
  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -250, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 250, behavior: "smooth" });
  };

  return (
    <div className="container mx-auto overflow-hidden border-b border-gray-200 pt-10 md:pt-[120px] pb-12 md:pb-[87px]">
      {/* Tag */}
      <div className="flex items-center gap-3">
        <div className="w-3 h-6 bg-red-500 rounded-sm md:w-5 md:h-10"></div>
        <span className="text-red-500 font-semibold text-sm md:text-[16px]">
          Today's
        </span>
      </div>

      {/* Header & Timer */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mt-4 md:mt-6 gap-6 md:gap-0">
        {/* Title + Timer Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-[120px]">
          {/* Title */}
          <h2 className="text-[24px] md:text-[36px] font-semibold text-gray-900 leading-tight">
            Flash Sales
          </h2>

          {/* Timer */}
          <div className="flex gap-4 md:gap-6 text-center">
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Minutes", value: timeLeft.minutes },
              { label: "Seconds", value: timeLeft.seconds },
            ].map((item, idx) => (
              <div key={idx}>
                <span className="text-[10px] md:text-[12px] text-gray-700 block">
                  {item.label}
                </span>
                <p className="text-[20px] md:text-[32px] font-bold leading-none">
                  {format(item.value)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-3 self-end md:self-auto">
          <button
            onClick={scrollLeft}
            className="p-2 md:p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={scrollRight}
            className="p-2 md:p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Product Carousel */}
      <div
        ref={scrollRef}
        className="mt-6 md:mt-8 flex gap-4 md:gap-[45px] overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory"
      >
        {data.map((item) => (
          <div
            key={item.id}
            className="snap-start shrink-0 w-[160px] md:w-auto"
          >
            <ProductCard item={item} showDiscount={true} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlashSales;
