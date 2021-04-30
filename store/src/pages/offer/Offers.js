import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Typography, Card } from "antd";

import ProductCard from "../../components/product/ProductCard";
import MainContainer from "../../components/layout/MainContainer";
import { agent } from "../../helpers/agent";

const { Title, Text } = Typography;

function Offers() {
  const [offersData, setOffersData] = useState([]);

  useEffect(() => {
    agent
      .getOffers()
      .then((res) => res.json())
      .then(({ data }) => setOffersData(data));
  }, []);

  console.log(offersData);

  return (
    <MainContainer>
      <div style={{ marginTop: "1rem" }}>
        {offersData.map((offer) => {
          return (
            <div key={offer.id}>
              <div style={{ marginBottom: "3rem" }}>
                <Card>
                  <div style={{ marginTop: "1rem" }}></div>
                  <Title level={2}>{offer.name}</Title>
                  <Text>{offer.description}</Text>
                </Card>
                <div style={{ marginBottom: "1rem" }}></div>
                <Row gutter={[16, 16]}>
                  {offer.products.map((product) => (
                    <Col xxl={6} xl={6} md={8} sm={12} xs={12} key={product.id}>
                      <Link to={`/products/${product.id}`}>
                        <ProductCard
                          title={product.name}
                          price={product.price}
                          discount={offer.discount}
                        />
                      </Link>
                    </Col>
                  ))}
                </Row>
              </div>
            </div>
          );
        })}
      </div>
    </MainContainer>
  );
}

export default Offers;
