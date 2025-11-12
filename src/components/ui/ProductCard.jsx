import React, { useState } from "react";
import { Heart, Eye, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { addToCart } from "../../services/cart";
import { supabase } from "../../lib/supabase-client";

const ProductCard = ({ item, showDiscount, isLoading, isError }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState("");

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading products.</p>;

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setIsAdding(true);
      setMessage("");
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setMessage("Please log in to add items to your cart");
        return;
      }

      await addToCart(user.id, item, 1);
      setMessage("Added to  cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      setMessage("❌ Failed to add item.");
    } finally {
      setIsAdding(false);
      setTimeout(() => setMessage(""), 2000);
    }
  }
  return (
    <Link
      to={`/products/${item.category}/${item.title}/${item.id}`}
      className="w-[270px] h-[350px] bg-white rounded-lg cursor-pointer overflow-hidden group hover:shadow-xs transition-all duration-500 relative mt-10"
    >
      {/* Image Section */}
      <div className="relative bg-[#F5F5F5] h-[250px] flex justify-center items-center p-6 overflow-hidden">
        {/* Discount Tag */}

        {showDiscount && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-[11px] font-medium px-1.5 py-0.5 rounded">
            {item.discountPercentage}
          </span>
        )}

        {/* Action Icons */}
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-1.5 bg-white rounded-full shadow hover:bg-gray-100">
            <Heart size={15} className="text-gray-700" />
          </button>
          <button className="p-1.5 bg-white rounded-full shadow hover:bg-gray-100">
            <Eye size={15} className="text-gray-700" />
          </button>
        </div>

        {/* Product Image */}
        <img
          src={item.images?.[0]}
          alt={item.title}
          className="w-[200px] h-[200px] object-contain"
        />

        {/* Add to Cart Overlay */}
        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className="absolute cursor-pointer -bottom-10 left-0 w-full bg-black text-white text-[13px] font-medium py-2 opacity-0 group-hover:opacity-100 group-hover:bottom-0 transition-all duration-300"
        >
          {isAdding ? "Adding..." : "Add To Cart"}
        </button>
      </div>

      {/* Product Info */}
      <div className="p-3">
        <h3 className="text-[13px] font-medium text-gray-800 mb-1">
          {item.title}
        </h3>

        {/* Prices */}
        <div className="flex items-center gap-2 mb-1">
          <span className="text-red-500 font-semibold text-[15px]">
            ${item.price}
          </span>

          {showDiscount && (
            <span className="text-gray-400 line-through text-[13px]">
              {(item.price / (1 - item.discountPercentage / 100)).toFixed(2)}
            </span>
          )}
        </div>

        {/* Ratings */}
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={13} fill="#FFAD33" stroke="none" />
          ))}
          <span className="text-[12px] text-gray-500 ml-1">
            ({item.rating})
          </span>
        </div>
      </div>
      {/* Feedback Message */}
      {message && (
        <p className="absolute bottom-1 left-0 w-full text-center text-[11px] text-gray-600">
          {message}
        </p>
      )}
    </Link>
  );
};

export default ProductCard;
