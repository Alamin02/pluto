import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";

import styles from "./ProductList.module.css";
import sampleProductData from "../../assets/data/sampleProductData";

import CardItem from "./ProductCard";
import Header from "./Header";
import ButtonBlack from "../styled-components/ButtonBlack";

function ProductList() {
  return (
    <div className={styles.containerFluid}>
      <Header title="popular products" />
      <Row gutter={[16, 16]}>
        {sampleProductData.map((item) => (
          <Col xxl={6} xl={8} md={12} sm={12} xs={24} key={item.id}>
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
            className={styles.buttonStyle}
          />
        </Link>
      </div>
    </div>
  );
}

export default ProductList;
