import React from "react";
import { Row, Col, Badge } from "antd";
import ProductCard from "../components/product/ProductCard";
import MainHeader from "../components/main-header/MainHeader";
import styles from "../components/offers/Offers.module.css";
import image1 from "../assets/images/watch-1-large.jpg";

function Offers() {
  return (
    <>
      <MainHeader name="Latest Offer" sub="home-shop-offer" />
      <div className={styles.container}>
        <Row justify="center" gutter={[16, 16]}>
          <Col span="8">
            <Badge.Ribbon color="red" text="10% off">
              <ProductCard title="test porduct" price="20" src={image1} />
            </Badge.Ribbon>
          </Col>
          <Col span="8">
            <Badge.Ribbon color="red" text="10% off">
              <ProductCard title="test porduct" price="20" src={image1} />
            </Badge.Ribbon>
          </Col>
          <Col span="8">
            <Badge.Ribbon color="red" text="10% off">
              <ProductCard title="test porduct" price="20" src={image1} />
            </Badge.Ribbon>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Offers;
