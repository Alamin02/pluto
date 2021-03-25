import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Badge } from "antd";

import ProductCard from "../../components/product/ProductCard";
import HeaderSection from "../../components/styled-components/HeaderSection";
import ProductList from "../../assets/data/sampleProductData";
import MainContainer from "../../components/layout/MainContainer";

function Offers() {
  return (
    <MainContainer>
      <div style={{ marginTop: "1rem" }}>
        <HeaderSection headerText="latest offers" />
        <Row gutter={[16, 16]}>
          {ProductList.map((product) => {
            if (product.offer) {
              return (
                <Col xxl={6} xl={6} md={8} sm={12} xs={12} key={product.id}>
                  <div>
                    <Link to={`/products/${product.id}`}>
                      <Badge.Ribbon color="red" text={product.offer}>
                        <ProductCard
                          id={product.id}
                          title={product.productName}
                          price={product.price}
                          src={product.imageUrl}
                        />
                      </Badge.Ribbon>
                    </Link>
                  </div>
                </Col>
              );
            } else {
              return null;
            }
          })}
        </Row>
      </div>
    </MainContainer>
  );
}

export default Offers;
