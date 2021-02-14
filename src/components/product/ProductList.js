import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";

import styles from "./ProductList.module.css";
import sampleProductData from "../../assets/data/sampleProductData";

import CardItem from "./ProductCard";
import HeaderSection from "../styled-components/HeaderSection";
import ButtonBlack from "../styled-components/ButtonBlack";

function ProductList() {
  return (
    <div className={styles.containerFluid}>
      <HeaderSection headerText="popular products" />
      <Row gutter={[16, 16]}>
        {sampleProductData.map((item) => (
          <Col xl={6} md={8} sm={12} xs={12} key={item.id}>
            <Link to={`/products/${item.id}`}>
              <CardItem
                title={item.productName}
                src={item.imageUrl}
                price={item.price}
              />
            </Link>
          </Col>
        ))}
      </Row>
      <div className={styles.buttonStyle}>
        <Link to="/products/list">
          <ButtonBlack
            buttonText="View all products"
          />
        </Link>
      </div>
    </div>
  );
}

export default ProductList;
