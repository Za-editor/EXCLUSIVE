import React from "react";

const ProductFilters = ({ filters, setFilters }) => {
  const categories = [
    "smartphones",
    "laptops",
    "fragrances",
    "skincare",
    "groceries",
    "home-decoration",
  ];

  const handlePriceChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: {
        ...prev.priceRange,
        [field]: value === "" ? "" : Number(value),
      },
    }));
  };

  return (
    <aside className="w-full md:w-1/4 border-r border-gray-200 pr-4 space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-2">Categories</h3>
        {categories.map((cat) => (
          <label key={cat} className="flex items-center gap-2 mb-2">
            <input
              className="cursor-pointer"
              type="radio"
              name="category"
              checked={filters.category === cat}
              onChange={() => setFilters({ ...filters, category: cat })}
            />
            <span className="capitalize">{cat.replace("-", " ")}</span>
          </label>
        ))}
      </div>

      {/* Price Range Inputs */}
      <div>
        <h3 className="font-semibold mb-3">Price Range</h3>
        <div className="flex items-center gap-3">
          <input
            type="number"
            placeholder="Min"
            value={filters?.priceRange?.min ?? ""}
            onChange={(e) => handlePriceChange("min", e.target.value)}
            className="w-1/2 border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-black"
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max"
            value={filters?.priceRange?.max ?? ""}
            onChange={(e) => handlePriceChange("max", e.target.value)}
            className="w-1/2 border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>
      </div>

      {/* Reset Filters */}
      <button
        onClick={() =>
          setFilters({
            category: "",
            priceRange: { min: "", max: "" },
            search: "",
          })
        }
        className="text-sm text-gray-500 hover:text-black underline cursor-pointer"
      >
        Reset Filters
      </button>
    </aside>
  );
};

export default ProductFilters;
