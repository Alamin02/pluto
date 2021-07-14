import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ProductView from "../../components/product-view/ProductView";
import HeaderSection from "../../components/styled-components/HeaderSection";
import { getProduct } from "../../client/products.client";
import MainContainer from "../../components/layout/MainContainer";
import Loading from "../../components/Loading";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = () => {
      getProduct(id)
        .then((res) => res.json())
        .then(({ data }) => {
          setProduct(data);
          setIsLoading(false);
        });
    };
    fetchProduct();
  }, [id]);

  if (isLoading) {
    return <Loading />;
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
