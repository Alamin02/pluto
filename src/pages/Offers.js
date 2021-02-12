import React from "react";
import { Row, Col, Badge } from "antd";
import ProductCard from "../components/product/ProductCard";
import MainHeader from "../components/main-header/MainHeader";
import ProductList from "../assets/data/sampleProductData";
import styles from "../components/offers/Offers.module.css";
import image1 from "../assets/images/watch-1-large.jpg";

function Offers() {
  return (
    <>
      <MainHeader name="Latest Offer" sub="home-shop-offer" />
      <div className={styles.container}>
        <Row justify="center" gutter={[16, 16]}>
          {ProductList.map((product) => {
            if (product.offer) {
              return (
                <Col span="8" key={product.id}>
                  <Badge.Ribbon color="red" text="10% off">
                    <ProductCard
                      id={product.id}
                      title={product.productName}
                      price={product.price}
                      src={product.imageUrl}
                    />
                  </Badge.Ribbon>
                </Col>
              );
            } else {
              return null;
            }
          })}
        </Row>
      </div>
    </>
  );
}

export default Offers;
