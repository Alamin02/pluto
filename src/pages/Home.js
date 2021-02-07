import React from "react";

import Slider from "../components/slider/Slider";
import FeaturedProducts from "../components/featured-products/FeaturedProducts";
import ProductList from "../components/product/ProductList";
import Registration from "../components/registration/Registration"

const Home = () => {
  return (
    <div>
      <Slider />
      <FeaturedProducts />
      <Registration />
      <ProductList />      
    </div>
  );
};

export default Home;
