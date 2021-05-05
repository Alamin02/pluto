import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ProductView from "../../components/product-view/ProductView";
import HeaderSection from "../../components/styled-components/HeaderSection";
import { agent } from "../../helpers/agent";
import MainContainer from "../../components/layout/MainContainer";
import Loading from "../../components/Loading";

const FeaturedProductDetails = () => {
  const [featuredProduct, setFeaturedProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchFeaturedProduct = () => {
      agent
        .getfeaturedProduct(id)
        .then((res) => res.json())
        .then(({ data }) => {
          console.log(data)
          setFeaturedProduct(data);
          setIsLoading(false);
        });
    };
    fetchFeaturedProduct();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <MainContainer>
      <div style={{ marginTop: "20px" }}>
        <HeaderSection headerText="product details" />
        <ProductView product={featuredProduct} />
      </div>
    </MainContainer>
  );
};

export default FeaturedProductDetails;
