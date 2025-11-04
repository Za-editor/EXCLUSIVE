import React, { useEffect, useState } from "react";
import speaker from "/assets/jambox.png"; // replace with your actual image path

const PromoSection = () => {
  const [time, setTime] = useState({
    days: 5,
    hours: 23,
    minutes: 59,
    seconds: 35,
  });

  // Simple countdown effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        let { days, hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
          days--;
        }
        if (days < 0) {
          clearInterval(interval);
          days = 0;
          hours = 0;
          minutes = 0;
          seconds = 0;
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-linear-to-br from-black via-gray-900 to-black text-white rounded-lg p-10 md:p-16 container mx-auto">
      {/* Left Section */}
      <div className="max-w-xl">
        <h4 className="text-[#00FF66] font-semibold text-lg mb-2">
          Categories
        </h4>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-8">
          Enhance Your
          <br />
          Music Experience
        </h1>

        {/* Countdown */}
        <div className="flex space-x-4 mb-8">
          <div className="bg-white text-black rounded-full w-20 h-20 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold">
              {String(time.hours).padStart(2, "0")}
            </span>
            <p className="text-xs font-medium">Hours</p>
          </div>
          <div className="bg-white text-black rounded-full w-20 h-20 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold">
              {String(time.days).padStart(2, "0")}
            </span>
            <p className="text-xs font-medium">Days</p>
          </div>
          <div className="bg-white text-black rounded-full w-20 h-20 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold">
              {String(time.minutes).padStart(2, "0")}
            </span>
            <p className="text-xs font-medium">Minutes</p>
          </div>
          <div className="bg-white text-black rounded-full w-20 h-20 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold">
              {String(time.seconds).padStart(2, "0")}
            </span>
            <p className="text-xs font-medium">Seconds</p>
          </div>
        </div>

        {/* Button */}
        <button className="bg-[#00FF66] hover:bg-[#00cc55] transition-colors text-black font-semibold px-8 py-3 rounded-md text-lg cursor-pointer duration-300">
          Buy Now!
        </button>
      </div>

      {/* Right Section */}
      <div className="mt-10 md:mt-0 md:mr-40 ">
        <img
          src={speaker}
          alt="Speaker"
          className="w-[450px] md:w-[520px] object-contain"
        />
      </div>
    </div>
  );
};

export default PromoSection;
