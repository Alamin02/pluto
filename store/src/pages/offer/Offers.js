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
      .then(({ data }) => {
        console.log(data.offers)
        setOffersData(data.offers)
      })
  }, []);

  return (
    <MainContainer>
      <div style={{ marginTop: "1rem" }}>
        <Row gutter={[16, 16]}>
          {offersData.map((offer) => (
            <Col xxl={6} xl={6} md={8} sm={12} xs={12} key={offer.id}>
              {/* <Link to={`/products/${product.id}`}> */}
              <ProductCard
                title={offer.name}
                src={offer.offerImage[0].path}
                // price={product.price}
                discount={offer.discount}
              />
              {/* </Link> */}
            </Col>
          ))}
        </Row>
      </div >
    </MainContainer >
  );
}

export default Offers;
