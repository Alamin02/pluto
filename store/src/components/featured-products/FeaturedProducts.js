import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid, Skeleton } from "antd";
import classNames from "classnames";
import styles from "./FeaturedProducts.module.css";

import MainContainer from "../layout/MainContainer";
import HeaderSection from "../styled-components/HeaderSection";

import { getFeaturedProducts } from "../../client/featuredProducts.client";

const { useBreakpoint } = Grid;

export default function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    getFeaturedProducts().then((res) =>
      res.json().then(({ data }) => setFeaturedProducts(data))
    );
  }, []);

  console.log(featuredProducts[0]);

  const screens = useBreakpoint();

  return (
    <MainContainer>
      <div className={styles.headerMargin}>
        <HeaderSection headerText="featured products" />
      </div>
      {featuredProducts.length ? (
        <section>
          {/* first row */}
          {featuredProducts[0] && (
            <div
              className={classNames(
                { [styles.rowContainer]: screens },
                { [styles.rowContainerXs]: screens.xs }
              )}
            >
              {/* first row, first image */}
              <div className={styles.featuredProductContainer}>
                <Link to={`/products/${featuredProducts[0].productId}`}>
                  <img
                    className={styles.imageStyle}
                    src={featuredProducts[0].image.path}
                    alt={featuredProducts[0].title}
                  />
                  <p className={styles.titleStyle}>
                    {featuredProducts[0].title}
                  </p>
                </Link>
              </div>
              {/* first row, second image */}
              <div className={styles.featuredProductContainer}>
                <Link to={`/products/${featuredProducts[1].productId}`}>
                  <img
                    className={styles.imageStyle}
                    src={featuredProducts[1].image.path}
                    alt={featuredProducts[1].title}
                  />
                  <p className={styles.titleStyle}>
                    {featuredProducts[0].title}
                  </p>
                </Link>
              </div>
            </div>
          )}

          {/* second row */}
          {featuredProducts[1] && (
            <div
              className={classNames(
                { [styles.rowContainer]: screens },
                { [styles.rowContainerXs]: screens.xs }
              )}
            >
              {/* second row, first image */}
              <div className={styles.featuredProductContainer}>
                <Link to={`/products/${featuredProducts[1].productId}`}>
                  <img
                    className={styles.imageStyle}
                    src={featuredProducts[2].image.path}
                    alt={featuredProducts[2].title}
                  />
                  <p className={styles.titleStyle}>
                    {featuredProducts[2].title}
                  </p>
                </Link>
              </div>
              {/* second row, second image */}
              <div className={styles.featuredProductContainer}>
                <Link to={`/products/${featuredProducts[3].productId}`}>
                  <img
                    className={styles.imageStyle}
                    src={featuredProducts[3].image.path}
                    alt={featuredProducts[3].title}
                  />
                  <p className={styles.titleStyle}>
                    {featuredProducts[3].title}
                  </p>
                </Link>
              </div>
            </div>
          )}
        </section>
      ) : (
        <Skeleton active />
      )}
    </MainContainer>
  );
}
