import React from "react";

import Slider from "../components/slider/Slider";
import ProductList from "../components/product/ProductList";
import FeaturedProductsAlt from "../components/featured-products-alt/FeaturedProductsAlt";

const Home = () => {
  return (
    <div>
      <Slider />
      <FeaturedProductsAlt />
      <ProductList />
    </div>
  );
};

export default Home;
