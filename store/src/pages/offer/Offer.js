import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, Typography, Skeleton } from "antd";

import ProductCard from "../../components/product/ProductCard";
import MainContainer from "../../components/layout/MainContainer";
import HeaderSection from "../../components/styled-components/HeaderSection";
import { getOffer } from "../../client/offers.client";
import styles from "./Offers.module.css";

const { Text } = Typography;

export default function Offer() {
  const [offer, setOffer] = useState("");

  const { id } = useParams();

  useEffect(() => {
    getOffer(id)
      .then((res) => res.json())
      .then(({ data }) => {
        setOffer(data);
      });
  }, [id]);

  return (
    <MainContainer>
      {offer ? (
        <div>
          <HeaderSection headerText={`${offer.name}`} />
          <div key={offer.id} className={styles.indivudialOfferSpace}>
            <img
              className={styles.offerImage}
              src={offer.offerImage[0].path}
              alt={offer.name}
            />
            <div className={styles.offerInfo}>
              <Text>{offer.description}</Text>
            </div>
            <Row gutter={[16, 16]}>
              {offer.products.map((product) => {
                return (
                  <Col xxl={6} xl={6} md={8} sm={12} xs={12} key={product.id}>
                    <Link to={`/products/${product.id}`}>
                      <ProductCard
                        title={product.name}
                        src={product.productImage[0].path}
                        price={product.price}
                        discount={offer.discount}
                      />
                    </Link>
                  </Col>
                );
              })}
            </Row>
          </div>
        </div>
      ) : (
        <Skeleton active />
      )}
    </MainContainer>
  );
}
