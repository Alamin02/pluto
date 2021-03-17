import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Badge, Button } from "antd";
import styles from "./ProductList.module.css";
import appStyles from "../../App.module.css";
import CardItem from "./ProductCard";
import HeaderSection from "../styled-components/HeaderSection";
import { agent } from "../../helpers/agent";

function ProductList() {
  const [productsData, setProductsData] = useState([]);

  function fetchProducts() {
    agent
      .getProducts()
      .then((res) => res.json())
      .then(({ data }) => {
        setProductsData(data.products);
        console.log(data.products);
      });
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className={appStyles.containerMain}>
      <div className={styles.container}>
        <HeaderSection headerText="popular products" />
        <Row gutter={[16, 16]}>
          {productsData.map((product) => {
            if (product.offer) {
              return (
                <Col xxl={6} xl={6} md={8} sm={12} xs={12} key={product.id}>
                  <Link to={`/products/${product.id}`}>
                    <Badge.Ribbon
                      color="red"
                      text={product.offer.discount + ` % off`}
                    >
                      <CardItem
                        title={product.name}
                        src={product.images[0].path}
                        price={Math.floor(
                          product.price -
                            (product.price * product.offer.discount) / 100
                        )}
                        discount={product.price}
                      />
                    </Badge.Ribbon>
                  </Link>
                </Col>
              );
            } else {
              return (
                <Col xxl={6} xl={6} md={8} sm={12} xs={12} key={product.id}>
                  <Link to={`/products/${product.id}`}>
                    <CardItem
                      title={product.name}
                      src={product.images.length && product.images[0].path}
                      price={product.price}
                    />
                  </Link>
                </Col>
              );
            }
          })}
        </Row>
        <div className={styles.buttonStyle}>
          <Link to="/products/list">
            <Button type="primary" style={{ textTransform: "uppercase" }}>
              View all products
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
