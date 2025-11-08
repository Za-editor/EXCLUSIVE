import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaTruck, FaUndo } from "react-icons/fa";
import ProductCard from "../components/ui/ProductCard";
import { useProduct, useRelatedProduct } from "../hooks/useProducts";

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading } = useProduct(id);

  const relatedCategory = product?.category;
  const { data: related = [], isLoading: relatedLoading } =
    useRelatedProduct(relatedCategory);

 
  useEffect(() => {
    if (product?.images?.length) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);
 const navigate = useNavigate();
 const { pathname } = useLocation();
   const pathParts = pathname.split("/").filter(Boolean);

const handleClick = (index) => {
  const cleanedParts = pathParts.filter(
    (part) => isNaN(Number(part)) 
  );


  const newPath =
    index === -1 ? "/" : "/" + cleanedParts.slice(0, index + 1).join("/");

  navigate(newPath);
};

  if (isLoading)
    return <div className="text-center py-10">Loading product...</div>;
  if (!product)
    return <div className="text-center py-10">Product not found.</div>;

  return (
    <section className="container mx-auto px-4 md:px-0 py-10">
      <div className="flex gap-2 text-gray-600 my-10">
        <span
          onClick={() => handleClick(-1)}
          className="cursor-pointer hover:text-black font-medium"
        >
          Home
        </span>

        {pathParts
          .filter((part) => isNaN(Number(part))) // remove numeric IDs
          .map((part, index, arr) => {
            const isLast = index === arr.length - 1;
            const cleaned = decodeURIComponent(part.replace(/-/g, " "));

            return (
              <React.Fragment key={index}>
                <span className="text-gray-400">/</span>
                {isLast ? (
                  <span className="text-gray-500 capitalize">{cleaned}</span>
                ) : (
                  <span
                    onClick={() => handleClick(index)}
                    className="cursor-pointer hover:text-black capitalize"
                  >
                    {cleaned}
                  </span>
                )}
              </React.Fragment>
            );
          })}
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Image Gallery */}
        <div className="flex flex-col md:w-3/5">
          <div className="flex gap-3 mb-4">
            <div className="flex flex-col gap-3 w-40">
              {product.images?.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={product.title}
                  onClick={() => setSelectedImage(img)}
                  className={`cursor-pointer border rounded-lg bg-gray-100 ${
                    selectedImage === img
                      ? "border-gray-300"
                      : "border-gray-100"
                  }`}
                />
              ))}
            </div>
            <div className="flex-1 bg-gray-100 rounded-lg flex items-center justify-center">
              <img
                src={selectedImage}
                alt={product.title}
                className="object-contain w-full h-[400px]"
              />
            </div>
          </div>
        </div>

        {/* Right Product Info */}
        <div className="flex-1 space-y-4">
          <h2 className="text-2xl font-semibold">{product.title}</h2>
          <div className="flex items-center gap-3">
            <span className="text-yellow-500">
              {"⭐".repeat(Math.min(5, Math.round(product.rating)))}
            </span>
            <span className="text-gray-600 text-sm">
              ({product.rating} / 5)
            </span>
            <span className="text-green-600 text-sm font-medium">In Stock</span>
          </div>

          <p className="text-2xl font-semibold">${product.price}</p>
          <p className="text-gray-600 text-sm leading-relaxed">
            {product.description}
          </p>

          {/* Dimensions */}
          {product.dimensions && (
            <div>
              <h4 className="font-medium text-md mb-1">
                Width:{" "}
                <span className="text-gray-600">
                  {product.dimensions.width}
                </span>
              </h4>
              <h4 className="font-medium text-md mb-1">
                Height:{" "}
                <span className="text-gray-600">
                  {product.dimensions.height}
                </span>
              </h4>
            </div>
          )}


          {/* Quantity & Buy */}
          <div className="flex items-center gap-4 mt-4">
            <div className="flex border rounded-md">
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
            <button className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600">
              Buy Now
            </button>
          </div>

          {/* Info Boxes */}
          <div className="mt-6 space-y-2">
            <div className="flex items-center gap-3 border rounded p-3">
              <FaTruck className="text-gray-600" />
              <div>
                <p className="text-sm font-medium">Free Delivery</p>
                <p className="text-xs text-gray-500">
                  Enter your postal code for delivery availability.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 border rounded p-3">
              <FaUndo className="text-gray-600" />
              <div>
                <p className="text-sm font-medium">Return Delivery</p>
                <p className="text-xs text-gray-500">
                  Free 30 Days Delivery Returns. Details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <div className="flex items-center gap-4">
          <div className="w-5 h-10 bg-red-500 rounded-sm"></div>
          <span className="text-red-500 font-semibold text-[16px]">
            Related items
          </span>
        </div>

        {relatedLoading ? (
          <p className="text-gray-500 text-sm mt-4">
            Loading related products...
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {related && related.length > 0 ? (
              related
                .slice(0, 5)
                .map((item) => (
                  <ProductCard key={item.id} item={item} showDiscount={false} />
                ))
            ) : (
              <p className="text-gray-500 text-sm">
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
