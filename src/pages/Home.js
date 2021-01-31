import React from "react";

import Slider from "../components/slider/Slider";
import FeaturedProducts from "../components/featured-products/FeaturedProducts";
import ProductList from "../components/product/ProductList";

const Home = () => {
  return (
    <div>
      <Slider />
      <FeaturedProducts />
      <ProductList />
    </div>
  );
};

export default Home;
