import React from "react";

import MainContainer from "../components/layout/MainContainer";
import Slider from "../components/slider/Slider";
import FeaturedProducts from "../components/featured-products/FeaturedProducts";
import ProductList from "../components/product/ProductList";

export default function Home() {
  return (
    <div>
      <Slider />
      <MainContainer>
        <FeaturedProducts />
        <ProductList />
      </MainContainer>
    </div>
  );
}
