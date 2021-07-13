import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Typography, Skeleton } from "antd";

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
                <Link to={`/offers/${offer.id}`}>
                  <img
                    className={styles.offerImage}
                    src={offer.offerImage[0].path}
                    alt={offer.name}
                  />
                </Link>
                <div className={styles.offerInfo}>
                  <Link to={`/offers/${offer.id}`}>
                    <Title level={3}>{offer.name}</Title>
                  </Link>
                  <Text>{offer.description} </Text>
                  <br />
                  <Link to={`/offers/${offer.id}`}>
                    See all products from this offer
                  </Link>
                </div>
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
