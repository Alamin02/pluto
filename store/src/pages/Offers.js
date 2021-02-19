import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Badge } from "antd";
import ProductCard from "../components/product/ProductCard";
// import MainHeader from "../components/main-header/MainHeader";
import HeaderSection from "../components/styled-components/HeaderSection";
import ProductList from "../assets/data/sampleProductData";
import styles from "./Offers.module.css";
import appStyles from "../App.module.css";

function Offers() {
  return (
    <div className={appStyles.containerMain}>
      {/* <MainHeader name="Latest Offer" sub="home-shop-offer" /> */}
      <div className={styles.container}>
        <HeaderSection headerText="latest offers" />
        <Row gutter={[16, 16]} justify="center">
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
    </div>
  );
}

export default Offers;
