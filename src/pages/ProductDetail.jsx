import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaTruck, FaUndo } from "react-icons/fa";
import ProductCard from "../components/ui/ProductCard";
import { useProduct, useRelatedProduct } from "../hooks/useProducts";
import { addToCart } from "../services/cart";
import { supabase } from "../lib/supabase-client";

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState("");

  const { data: product, isLoading } = useProduct(id);
  const relatedCategory = product?.category;
  const { data: related = [], isLoading: relatedLoading } =
    useRelatedProduct(relatedCategory);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const pathParts = pathname.split("/").filter(Boolean);

  useEffect(() => {
    if (product?.images?.length) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);

  const handleClick = (index) => {
    const cleanedParts = pathParts.filter((part) => isNaN(Number(part)));
    const newPath =
      index === -1 ? "/" : "/" + cleanedParts.slice(0, index + 1).join("/");
    navigate(newPath);
  };

  const handleAddtoCart = async () => {
    try {
      setIsAdding(true);
      setMessage("");

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setMessage("Please log in to add items to your cart.");
        return;
      }

      await addToCart(user.id, product, quantity);
      setMessage("✅ Added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      setMessage("❌ Failed to add to cart.");
    } finally {
      setIsAdding(false);
      setTimeout(() => setMessage(""), 2000);
    }
  };

  if (isLoading)
    return <div className="text-center py-10">Loading product...</div>;
  if (!product)
    return <div className="text-center py-10">Product not found.</div>;

  return (
    <section className="container mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="flex flex-wrap gap-1 text-gray-600 my-6 text-sm">
        <span
          onClick={() => handleClick(-1)}
          className="cursor-pointer hover:text-black font-medium"
        >
          Home
        </span>

        {pathParts
          .filter((part) => isNaN(Number(part)))
          .map((part, index, arr) => {
            const isLast = index === arr.length - 1;
            const name = decodeURIComponent(part.replace(/-/g, " "));

            return (
              <>
                <span className="px-1">/</span>
                {isLast ? (
                  <span className="capitalize text-gray-500">{name}</span>
                ) : (
                  <span
                    className="cursor-pointer hover:text-black capitalize"
                    onClick={() => handleClick(index)}
                  >
                    {name}
                  </span>
                )}
              </>
            );
          })}
      </div>

      {/* Layout */}
      <div className="flex flex-col md:flex-row gap-10">
        {/* Images */}
        <div className="w-full md:w-1/2">
          <div className="flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-3 w-full md:w-24 overflow-x-auto md:overflow-visible">
              {product.images.slice(0, 4).map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt=""
                  onClick={() => setSelectedImage(img)}
                  className={`h-20 w-20 md:w-full md:h-24 object-contain cursor-pointer border rounded-lg ${
                    selectedImage === img
                      ? "border-gray-400"
                      : "border-gray-200"
                  }`}
                />
              ))}
            </div>

            {/* Main image */}
            <div className="flex-1 bg-gray-100 rounded-lg p-3 flex items-center justify-center">
              <img
                src={selectedImage}
                alt=""
                className="w-full h-[280px] md:h-[380px] object-contain"
              />
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 space-y-4">
          <h2 className="text-xl md:text-2xl font-semibold">{product.title}</h2>

          {/* Rating */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-yellow-500">
              {"⭐".repeat(Math.min(5, Math.round(product.rating)))}
            </span>
            <span className="text-gray-600">({product.rating}/5)</span>
            <span className="text-green-600 ml-2">In Stock</span>
          </div>

          <p className="text-2xl font-bold">${product.price}</p>

          <p className="text-gray-600">{product.description}</p>

          {/* Quantity */}
          <div className="flex items-center gap-4 mt-4">
            <div className="flex border border-gray-300 rounded-md">
              <button
                className="px-3 py-1"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <span className="px-4 py-1 border-x">{quantity}</span>
              <button
                className="px-3 py-1"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddtoCart}
              disabled={isAdding}
              className="bg-red-500 text-white px-6 py-2 rounded-md w-full md:w-auto"
            >
              {isAdding ? "Adding..." : "Buy Now"}
            </button>
          </div>

          {message && <p className="text-sm text-gray-600 mt-2">{message}</p>}

          {/* Delivery & Return */}
          <div className="space-y-2 mt-4">
            <div className="flex items-center gap-3 border p-3 rounded-md">
              <FaTruck className="text-gray-600" />
              <div>
                <p className="font-medium text-sm">Free Delivery</p>
                <p className="text-xs text-gray-500">
                  Enter your postal code to check availability.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 border p-3 rounded-md">
              <FaUndo className="text-gray-600" />
              <div>
                <p className="font-medium text-sm">Return Delivery</p>
                <p className="text-xs text-gray-500">
                  30-Day free return guarantee.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-5 h-8 bg-red-500 rounded-sm"></div>
          <span className="text-red-500 font-semibold text-[16px]">
            Related Products
          </span>
        </div>

        {relatedLoading ? (
          <p className="text-gray-600 text-sm">Loading related products…</p>
        ) : (
          <div
            className="
        grid 
        grid-cols-2 
        xs:grid-cols-2 
        sm:grid-cols-3 
        md:grid-cols-4 
        lg:grid-cols-5 
        gap-4
      "
          >
            {related && related.length > 0 ? (
              related.slice(0, 5).map((item) => (
                <div key={item.id} className="w-full">
                  <ProductCard item={item} showDiscount={false} />
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm col-span-full">
                No related products found.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductDetail;
