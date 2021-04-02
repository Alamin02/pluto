import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ProductView from "../../components/product-view/ProductView";
import HeaderSection from "../../components/styled-components/HeaderSection";
import { agent } from "../../helpers/agent";
import MainContainer from "../../components/layout/MainContainer";
import Loading from "../../components/Loading";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  function fetchProduct() {
    agent
      .getProduct(id)
      .then((res) => res.json())
      .then(({ data }) => {
        console.log(data);
        setProduct(data);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (isLoading) {
    return <Loading />; // Have to replace with loading component
  }

  return (
    <MainContainer>
      <div style={{ marginTop: "20px" }}>
        {/* <MainHeader name="product details" sub="home ⋅ shop ⋅ products" /> */}
        <HeaderSection headerText="product details" />
        <ProductView product={product} />
      </div>
    </MainContainer>
  );
};

export default ProductDetails;
