import Hero from "../components/Hero";
import FlashSales from "../components/FlashSales";
import Categories from "../components/Categories";
import BestSelling from "../components/BestSelling";
import ExploreProducts from "../components/ExploreProducts";
import Featured from "../components/Featured";
import ServiceFeatures from "../components/ServiceFeatures";
import PromoSection from "../components/PromoSection";
import { useProducts } from "../hooks/useProducts";

const Homepage = () => {
  const { data: products = [], isLoading, isError } = useProducts();
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading products.</p>;

  const bestSelling = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  const flashSales = [...products]
    .filter((p) => p.discountPercentage > 10)
    .slice(0, 10);

  const newArrivals = [...products]
    .sort((a, b) => new Date(b.meta.createdAt) - new Date(a.meta.createdAt))
    .slice(0, 4);

  
const smartphoneProducts = products.filter(
  (product) => product.category === "smartphones"
);

  return (
    <>
      <Hero data={smartphoneProducts} />
      <FlashSales data={flashSales} />
      <Categories />
      <BestSelling data={bestSelling} />
      <PromoSection />
      <ExploreProducts data={products} />
      <Featured data={newArrivals} />
      <ServiceFeatures />
    </>
  );
};

export default Homepage;
