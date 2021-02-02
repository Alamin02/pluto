import React from "react";
import MainHeader from "../components/main-header/MainHeader"
import ProductView from "../components/product-view/ProductView";

const ProductDetails = () => {
  return (
    <div>
      <MainHeader name='popular products' sub='home - shop - products' />
      <ProductView />
    </div>
  );
};

export default ProductDetails;
