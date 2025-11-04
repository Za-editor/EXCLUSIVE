import React from "react";
import Hero from "../components/Hero";
import FlashSales from "../components/FlashSales";
import Categories from "../components/Categories";
import BestSelling from "../components/BestSelling";
import ExploreProducts from "../components/ExploreProducts";
import Featured from "../components/Featured";
import ServiceFeatures from "../components/ServiceFeatures";
import PromoSection from "../components/PromoSection";

const Homepage = () => {
  return (
    <>
      <Hero />
      <FlashSales />
      <Categories />
      <BestSelling />
      <PromoSection/>
      <ExploreProducts />
      <Featured />
      <ServiceFeatures/>
    </>
  );
};

export default Homepage;
