import React from "react";

import Slider from "../components/slider/Slider";
import FeaturedProducts from "../components/featured-products/FeaturedProducts";
import ProductList from "../components/product/ProductList";
import FeaturedProductsAlt from "../components/featured-products-alt/FeaturedProductsAlt";

const Home = () => {
  return (
    <div>
      <Slider />
      <FeaturedProducts />
      {/* <FeaturedProductsAlt /> */}
      <ProductList />
    </div>
  );
};

export default Home;
