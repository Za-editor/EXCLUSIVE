import React, { useState, useMemo, useEffect } from "react";
import ProductCard from "../components/ui/ProductCard";
import ProductFilters from "../components/ProductFilters";
import { useCategory, useProducts } from "../hooks/useProducts";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const ProductsPage = () => {
  const [filters, setFilters] = useState({
    category: "",
    priceRange: { min: "", max: "" },
    search: "",
  });

  const { category } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const {
    data: allProducts = [],
    isLoading: loadingAll,
    isError: errorAll,
  } = useProducts({ enabled: !category });

  const {
    data: categoryProducts = [],
    isLoading: loadingCategory,
    isError: errorCategory,
  } = useCategory(category, { enabled: !!category });

  const data = category ? categoryProducts : allProducts;
  const isLoading = category ? loadingCategory : loadingAll;
  const isError = category ? errorCategory : errorAll;


  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.category) params.set("category", filters.category);
    if (filters.priceRange.min) params.set("min", filters.priceRange.min);
    if (filters.priceRange.max) params.set("max", filters.priceRange.max);
    if (filters.search) params.set("search", filters.search);

    navigate({
      pathname,
      search: params.toString(),
    });
  }, [filters, navigate, pathname]);


  const filteredProducts = useMemo(() => {
    return data.filter((product) => {
      const categoryMatch =
        !filters.category ||
        product.category.toLowerCase() === filters.category.toLowerCase();

      const min = Number(filters.priceRange.min) || 0;
      const max = Number(filters.priceRange.max) || Infinity;
      const priceMatch = product.price >= min && product.price <= max;

      const searchMatch = filters.search
        ? product.title.toLowerCase().includes(filters.search.toLowerCase())
        : true;

      return categoryMatch && priceMatch && searchMatch;
    });
  }, [data, filters]);


  const pathParts = pathname.split("/").filter(Boolean);

  const handleClick = (index) => {
    const newPath =
      index === -1 ? "/" : "/" + pathParts.slice(0, index + 1).join("/");
    navigate(newPath);
  };

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (isError)
    return <p className="text-center py-10">Error loading products.</p>;

  return (
    <div className="container mx-auto">
   
      <div className="flex gap-2 text-gray-600 my-10">
        <span
          onClick={() => handleClick(-1)}
          className="cursor-pointer hover:text-black font-medium"
        >
          Home
        </span>
        {pathParts.map((part, index) => (
          <span key={index} className="flex items-center gap-1">
            <span className="text-gray-400">/</span>
            <span
              onClick={() => handleClick(index)}
              className="cursor-pointer hover:text-black capitalize"
            >
              {part}
            </span>
          </span>
        ))}
      </div>

     
      <section className="flex flex-col md:flex-row mt-4">
        <ProductFilters filters={filters} setFilters={setFilters} />

        <div className="flex-1">
          <div className="flex items-center justify-between px-4">
            <h2 className="text-xl font-semibold capitalize">
              Explore {category ? category : "All Products"}
            </h2>
          </div>

          {filteredProducts.length === 0 ? (
            <p className="text-center text-gray-500 py-10">
              No products found matching filters.
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} item={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
