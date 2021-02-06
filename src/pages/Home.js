import React from "react";

import Slider from "../components/slider/Slider";
import FeaturedProducts from "../components/featured-products/FeaturedProducts";
import ProductList from "../components/product/ProductList";
import Login from "../components/login/Login";

const Home = () => {
  return (
    <div>
      <Slider />
      <FeaturedProducts />
      <Login />
      <ProductList />      
    </div>
  );
};

export default Home;
