import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Skeleton } from "antd";
import qs from "query-string";

import MainContainer from "../layout/MainContainer";
import CardItem from "./ProductCard";
import HeaderSection from "../styled-components/HeaderSection";
import { getProducts } from "../../client/products.client";

function ProductList() {
  const [productsData, setProductsData] = useState([]);
  const sort = "name";

  const queryString = qs.stringify({
    perPage: 8,
    sort,
  });

  useEffect(() => {
    const fetchProducts = () => {
      getProducts(queryString)
        .then((res) => res.json())
        .then(({ data }) => {
          setProductsData(data.products);
        });
    };
    fetchProducts();
  }, [queryString]);

  return (
    <MainContainer>
      <div style={{ marginTop: "2rem", marginBottom: "2rem" }}>
        <HeaderSection headerText="Popular Products" />
        {productsData.length ? (
          <Row gutter={[16, 16]}>
            {productsData.map((product) => {
              return (
                <Col xxl={6} xl={6} md={8} sm={12} xs={12} key={product.id}>
                  <Link to={`/products/${product.id}`}>
                    <CardItem
                      title={product.name}
                      src={
                        (product.productImage &&
                          product.productImage.length &&
                          product.productImage[0].path) ||
                        "#"
                      }
                      price={product.price}
                      discount={product.offer && product.offer.discount}
                    />
                  </Link>
                </Col>
              );
            })}
          </Row>
        ) : (
          <div>
            <Skeleton active />
          </div>
        )}
      </div>
    </MainContainer>
  );
}

export default ProductList;
