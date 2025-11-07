import React, { useState } from "react";



import ProductCard from "../components/ui/ProductCard";
import ProductFilters from "../components/ProductFilters";
import { useProducts } from "../hooks/useProducts";

const ProductsPage = () => {
  const [filters, setFilters] = useState({
    category: "",
    priceRange: null,
    search: "",
  });

  const { data, isLoading, isError } = useProducts();

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading products.</p>;
  console.log(data);
  

  return (
    <section className="container mx-auto flex flex-col md:flex-row mt-8">
      <ProductFilters filters={filters} setFilters={setFilters} />

      <div className="flex-1">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Explore All Products</h2>
          <input
            type="text"
            placeholder="Search products..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="border rounded-md px-3 py-1 text-sm"
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {data.map((product,index) => (
            <ProductCard
              key={index}
              item={product}
              isLoading={isLoading}
              isError={isError}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsPage;
