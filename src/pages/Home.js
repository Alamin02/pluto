import React from "react";

import Slider from "../components/slider/Slider";
import Feature from "../components/featured-products/FeatureProducts";
import ProductList from "../components/product/ProductList";

const Home = () => {
  return (
    <div>
      <Slider />
      <Feature />
      <ProductList />
    </div>
  );
};

export default Home;
