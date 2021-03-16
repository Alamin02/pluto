import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Badge } from "antd";
import styles from "./ProductList.module.css";
import appStyles from "../../App.module.css";
import sampleProductData from "../../assets/data/sampleProductData";
import CardItem from "./ProductCard";
import HeaderSection from "../styled-components/HeaderSection";
import ButtonBlack from "../styled-components/ButtonBlack";
import ProductDetails from "../../pages/ProductDetails";

function ProductList() {
  return (
    <div className={appStyles.containerMain}>
      <div className={styles.container}>
        <HeaderSection headerText="popular products" />
        <Row gutter={[16, 16]}>
          {sampleProductData.map((item) => {
            if (item.offer) {
              return (
                <Col xxl={6} xl={6} md={8} sm={12} xs={12} key={item.id}>
                  <Link to={`/products/${item.id}`}>
                    {/* <Badge.Ribbon color="red" text={item.offer}> */}
                    <Badge.Ribbon color="red" text={item.offer + ` % off`}>
                      <CardItem
                        title={item.productName}
                        src={item.imageUrl}
                        price={Math.floor(
                          item.price - (item.price * item.offer) / 100
                        )}
                        discount={item.price}
                      />
                    </Badge.Ribbon>
                  </Link>
                </Col>
              );
            } else {
              return (
                <Col xxl={6} xl={6} md={8} sm={12} xs={12} key={item.id}>
                  <Link to={`/products/${item.id}`}>
                    <CardItem
                      title={item.productName}
                      src={item.imageUrl}
                      price={item.price}
                    />
                  </Link>
                </Col>
              );
            }
          })}
        </Row>
        <div className={styles.buttonStyle}>
          <Link to="/products/list">
            <ButtonBlack buttonText="View all products" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
