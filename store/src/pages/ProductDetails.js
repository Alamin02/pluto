import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MainHeader from "../components/main-header/MainHeader";
import ProductView from "../components/product-view/ProductView";

import productList from "../assets/data/sampleProductData";
import Error404 from "../components/error-404/Error404";
import HeaderSection from "../components/styled-components/HeaderSection";
import { agent } from "../helpers/agent";
import appStyles from "../App.module.css";

const container = {
  marginTop: "20px",
};

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
    <div className={appStyles.containerMain}>
      <div style={container}>
        {/* <MainHeader name="product details" sub="home ⋅ shop ⋅ products" /> */}
        <HeaderSection headerText="product details" />
        <ProductView product={product} />
      </div>
    </div>
  );
};

export default ProductDetails;
