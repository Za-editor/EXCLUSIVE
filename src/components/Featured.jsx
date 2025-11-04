import React from "react";

const Featured = () => {
  return (
    <div className="pt-[71px] pb-[87px] container mx-auto overflow-hidden  ">
      {/* Tag */}
      <div className="flex items-center gap-4">
        <div className="w-5 h-10 bg-red-500 rounded-sm"></div>
        <span className="text-red-500 font-semibold text-[16px]">Featured</span>
      </div>

      <h2 className="text-[36px] font-semibold text-gray-900 mt-4">
        New Arrival
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-8 md:grid-rows-8 gap-4 m-4">
        {/* PlayStation 5 */}
        <div className="col-start-1 row-start-1 row-span-2 md:col-start-1 md:row-start-1 md:col-span-2 md:row-span-8 bg-black rounded-md relative flex items-center group cursor-pointer">
          <img
            src="/assets/ps5-slim.png"
            alt="PlayStation 5"
            className="object-contain ml-8 group-hover:scale-102 transition-transform duration"
          />
          <div className="absolute bottom-6 left-6 text-white">
            <h2 className="text-2xl font-semibold mb-1">PlayStation 5</h2>
            <p className="text-sm text-gray-300 mb-3 w-60">
              Black and White version of the PS5 coming out on sale.
            </p>
            <button className="text-sm font-medium border-b border-white w-fit hover:text-gray-300 cursor-pointer">
              Shop Now
            </button>
          </div>
        </div>

        {/* Women’s Collections */}
        <div className="col-start-1 row-start-3 row-span-2 md:col-start-3 md:row-start-1 md:col-span-2 md:row-span-4 bg-black rounded-md relative flex items-center justify-center group cursor-pointer overflow-hidden">
          <img
            src="/assets/attractive-woman.png"
            alt="Women's Collections"
            className="object-contain group-hover:scale-102 transition-transform duration"
          />
          <div className="absolute bottom-6 left-6 text-white">
            <h2 className="text-xl font-semibold mb-1">Women’s Collections</h2>
            <p className="text-sm text-gray-300 mb-3 w-60">
              Featured woman collections that give you another vibe.
            </p>
            <button className="text-sm font-medium border-b border-white w-fit hover:text-gray-300 cursor-pointer">
              Shop Now
            </button>
          </div>
        </div>

        {/* Speakers */}
        <div className="col-start-1 row-start-5 row-span-2 md:col-start-3 md:row-start-5 md:col-span-1 md:row-span-4 bg-black rounded-md relative flex items-center justify-center group cursor-pointer overflow-hidden">
          <img
            src="/assets/speakers.png"
            alt="Speakers"
            className="object-contain group-hover:scale-102 transition-transform duration"
          />
          <div className="absolute bottom-6 left-6 text-white">
            <h2 className="text-xl font-semibold mb-1">Speakers</h2>
            <p className="text-sm text-gray-300 mb-3 w-60">
              Amazon wireless speakers.
            </p>
            <button className="text-sm font-medium border-b border-white w-fit hover:text-gray-300 cursor-pointer">
              Shop Now
            </button>
          </div>
        </div>

        {/* Perfume */}
        <div className="col-start-1 row-start-7 row-span-2 md:col-start-4 md:row-start-5 md:col-span-1 md:row-span-4 bg-black rounded-md relative flex items-end justify-center group cursor-pointer overflow-hidden">
          <img
            src="/assets/perfume.png"
            alt="Perfume"
            className="object-contain mb-4 group-hover:scale-102 transition-transform duration"
          />
          <div className="absolute bottom-6 left-6 text-white">
            <h2 className="text-xl font-semibold mb-1">Perfume</h2>
            <p className="text-sm text-gray-300 mb-3 w-60">
              GUCCI INTENSE OUD EDP.
            </p>
            <button className="text-sm font-medium border-b border-white w-fit hover:text-gray-300 cursor-pointer">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
