import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Typography, Skeleton } from "antd";

import ProductCard from "../../components/product/ProductCard";
import MainContainer from "../../components/layout/MainContainer";
import HeaderSection from "../../components/styled-components/HeaderSection";
import { agent } from "../../helpers/agent";
import styles from "./Offers.module.css";

const { Title, Text } = Typography;

function Offers() {
  const [offersData, setOffersData] = useState([]);
  console.log(offersData);

  useEffect(() => {
    agent
      .getOffers()
      .then((res) => res.json())
      .then(({ data }) => {
        console.log(data.offers);
        setOffersData(data.offers);
      });
  }, []);

  return (
    <MainContainer>
      <HeaderSection headerText="All offers" />
      {offersData.length ? (
        <div>
          {offersData.length &&
            offersData.map((offer) => (
              <div key={offer.id} className={styles.indivudialOfferSpace}>
                <img
                  className={styles.offerImage}
                  src={offer.offerImage[0].path}
                  alt={offer.name}
                />
                <div className={styles.offerInfo}>
                  <Title level={3}>{offer.name}</Title>
                  <Text>{offer.description}</Text>
                </div>
                <Row gutter={[16, 16]}>
                  {offer.products.map((product) => {
                    return (
                      <Col
                        xxl={6}
                        xl={6}
                        md={8}
                        sm={12}
                        xs={12}
                        key={product.id}
                      >
                        <Link to={`/products/${product.id}`}>
                          <ProductCard
                            title={product.name}
                            src={product.images[0].path}
                            price={product.price}
                            discount={offer.discount}
                          />
                        </Link>
                      </Col>
                    );
                  })}
                </Row>
              </div>
            ))}
        </div>
      ) : (
        <Skeleton active />
      )}
    </MainContainer>
  );
}

export default Offers;
