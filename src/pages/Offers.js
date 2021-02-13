import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Badge } from "antd";
import ProductCard from "../components/product/ProductCard";
import MainHeader from "../components/main-header/MainHeader";
import ProductList from "../assets/data/sampleProductData";
import styles from "./Offers.module.css";

function Offers() {
  return (
    <>
      <MainHeader name="Latest Offer" sub="home-shop-offer" />
      <div style={{ padding: "0 20px" }}>
        <div className={styles.container}>
          <Row justify="center">
            {ProductList.map((product) => {
              if (product.offer) {
                return (
                  <Col xs={12} sm={10} md={8} key={product.id}>
                    <div className={styles.cardContainer}>
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
      </div>
    </>
  );
}

export default Offers;
