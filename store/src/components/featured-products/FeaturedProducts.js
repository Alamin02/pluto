import { Link } from "react-router-dom";
import { Grid } from "antd";
import classNames from "classnames";
import styles from "./FeaturedProducts.module.css";

import MainContainer from "../layout/MainContainer";
import HeaderSection from "../styled-components/HeaderSection";
import featuredProductsInfo from "./featuredProductsInfo";

const { useBreakpoint } = Grid;

export default function FeaturedProducts() {
  const screens = useBreakpoint();

  return (
    <MainContainer>
      <div style={{ marginTop: "2rem" }}>
        <HeaderSection headerText="featured products" />
        {/* flexbox start */}
        <section
          className={classNames(
            { [styles.flexContainer]: screens },
            { [styles.flexContainerXs]: screens.xs }
          )}
        >
          {/* 1st flexbox container */}
          <section
            className={classNames(
              { [styles.firstFlexBoxContainer]: screens },
              { [styles.firstFlexBoxContainerXs]: screens.xs }

            )}
          >
            {/* top image of 1st flexbox container */}
            <div className={styles.firstFlexBoxTopImageContainer}>
              <Link to={featuredProductsInfo.image1Url}>
                <img
                  className={classNames(
                    { [styles.firstFlexBoxImage]: screens },
                    { [styles.firstFlexBoxImageXs]: screens.xs }
                  )}
                  src={featuredProductsInfo.image1Src}
                  alt={featuredProductsInfo.image1Title}
                />
                <div
                  className={classNames(
                    { [styles.imageTitle]: screens },
                    { [styles.imageTitleSm]: screens.sm },
                    { [styles.imageTitleXs]: screens.xs }
                  )}
                >
                  {featuredProductsInfo.image1Title}
                </div>
              </Link>
            </div>

            {/* bottom image of 1st flexbox container */}
            <div
              className={classNames(
                { [styles.firstFlexBoxBottomImageContainer]: screens },
                { [styles.firstFlexBoxBottomImageContainerXs]: screens.xs }
              )}
            >
              <Link to={featuredProductsInfo.image2Url}>
                <img
                  className={classNames(
                    { [styles.firstFlexBoxImage]: screens },
                    { [styles.firstFlexBoxImageXs]: screens.xs }
                  )}
                  src={featuredProductsInfo.image2Src}
                  alt={featuredProductsInfo.image2Title}
                />
                <div
                  className={classNames(
                    { [styles.imageTitle]: screens },
                    { [styles.imageTitleSm]: screens.sm },
                    { [styles.imageTitleXs]: screens.xs }
                  )}
                >
                  {featuredProductsInfo.image2Title}
                </div>
              </Link>
            </div>
          </section>

          {/* 2nd flexbox container */}
          <section
            className={classNames(
              { [styles.firstFlexBoxContainer]: screens },
              { [styles.firstFlexBoxContainerXs]: screens.xs }
            )}
          >
            {/* top image of 1st flexbox container */}
            <div className={styles.firstFlexBoxTopImageContainer}>
              <Link to={featuredProductsInfo.image3Url}>
                <img
                  className={classNames(
                    { [styles.firstFlexBoxImage]: screens },
                    { [styles.firstFlexBoxImageXs]: screens.xs }
                  )}
                  src={featuredProductsInfo.image3Src}
                  alt={featuredProductsInfo.image3Title}
                />
                <div
                  className={classNames(
                    { [styles.imageTitle]: screens },
                    { [styles.imageTitleSm]: screens.sm },
                    { [styles.imageTitleXs]: screens.xs }
                  )}
                >
                  {featuredProductsInfo.image3Title}
                </div>
              </Link>
            </div>

            {/* bottom image of 1st flexbox container */}
            <div
              className={classNames(
                { [styles.firstFlexBoxBottomImageContainer]: screens },
                { [styles.firstFlexBoxBottomImageContainerXs]: screens.xs }
              )}
            >
              <Link to={featuredProductsInfo.image4Url}>
                <img
                  className={classNames(
                    { [styles.firstFlexBoxImage]: screens },
                    { [styles.firstFlexBoxImageXs]: screens.xs }
                  )}
                  src={featuredProductsInfo.image4Src}
                  alt={featuredProductsInfo.image4Title}
                />
                <div
                  className={classNames(
                    { [styles.imageTitle]: screens },
                    { [styles.imageTitleSm]: screens.sm },
                    { [styles.imageTitleXs]: screens.xs }
                  )}
                >
                  {featuredProductsInfo.image4Title}
                </div>
              </Link>
            </div>
          </section>

        </section>
        {/* flexbox end */}
      </div>
    </MainContainer>
  );
}
