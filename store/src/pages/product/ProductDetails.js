import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ProductView from "../../components/product-view/ProductView";
import Error404 from "../../components/error-404/Error404";
import HeaderSection from "../../components/styled-components/HeaderSection";
import { agent } from "../../helpers/agent";
import MainContainer from "../../components/layout/MainContainer";

const ProductDetails = () => {
  const [productsData, setProductsData] = useState([]);

  function fetchProducts() {
    agent
      .getProducts()
      .then((res) => res.json())
      .then(({ data }) => {
        setProductsData(data.products);
      });
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const { id } = useParams();

  const product = productsData.find((product) => product.id === parseInt(id));

  if (!product) return <Error404 />;

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
