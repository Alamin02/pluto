import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";
import styles from "./ProductList.module.css";
import sampleProductData from "../../assets/data/sampleProductData";

import CardItem from "./ProductCard";
import Header from "./Header";
import ViewButton from "./Button";

function ProductList() {
  return (
    <div className={styles.containerFluid}>
      <Header title="popular products" />
      <Row gutter={[16, 16]}>
        {sampleProductData.map((item) => (
          <Col span={6} key={item.id}>
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
      <div className="view-products">
        <ViewButton type="link" />
      </div>
    </div>
  );
}

export default ProductList;
