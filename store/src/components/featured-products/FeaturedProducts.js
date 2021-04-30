import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid, Row, Col } from "antd";
import classNames from "classnames";
import styles from "./FeaturedProducts.module.css";

import MainContainer from "../layout/MainContainer";
import HeaderSection from "../styled-components/HeaderSection";
import { agent } from "../../helpers/agent"

const { useBreakpoint } = Grid;

export default function FeaturedProducts() {
  const screens = useBreakpoint();
  const [featuredProductsData, setFeaturedProductsData] = useState([]);

  useEffect(() => {
    const fetchFeaturedProducts = () => {
      agent
        .getFeaturedProducts()
        .then((res) => res.json())
        .then(({ data }) => {
          console.log(data)
          setFeaturedProductsData(data.featuredProducts);
        });
    };
    fetchFeaturedProducts();
  }, []);


  return (
    <MainContainer>
      <div style={{ marginTop: "2rem" }}>
        <HeaderSection headerText="featured products" />
        {/* flexbox start */}
        <Row gutter={[16, 16]}>
          {featuredProductsData.length === 4 ? (
            featuredProductsData.map((featuredProduct) => {
              return (
                <Col span={12} key={featuredProduct.id}>
                  <div className={styles.firstFlexBoxTopImageContainer}>
                    <Link to={`/featured-products/${featuredProduct.id}`}>
                      <img
                        className={classNames(
                          { [styles.firstFlexBoxImage]: screens },
                          { [styles.firstFlexBoxImageXs]: screens.xs }
                        )}
                        src={featuredProduct.images[0].path}
                        alt={featuredProduct.name}
                      />
                      <div
                        className={classNames(
                          { [styles.imageTitle]: screens },
                          { [styles.imageTitleSm]: screens.sm },
                          { [styles.imageTitleXs]: screens.xs }
                        )}
                      >
                        {featuredProduct.name}
                      </div>
                    </Link>
                  </div>
                </Col>
              )
            })
          ) : (
            <h2>No Featured Products are available</h2>
          )}
        </Row>
      </div>
    </MainContainer>
  );
}
