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
              { [styles.secondFlexBoxContainer]: screens },
              { [styles.secondFlexBoxContainerXs]: screens.xs }
            )}
          >
            {/* horizontal 3rd image */}
            <Link to={featuredProductsInfo.image3Url}>
              <img
                className={classNames(
                  { [styles.secondFlexBoxImageH]: screens },
                  { [styles.secondFlexBoxImageHXs]: screens.xs }
                )}
                src={featuredProductsInfo.image3HSrc}
                alt={featuredProductsInfo.image3Title}
              />
              {/* vertical 3rd image */}
              <img
                className={classNames(
                  { [styles.secondFlexBoxImageV]: screens },
                  { [styles.secondFlexBoxImageVXs]: screens.xs }
                )}
                src={featuredProductsInfo.image3VSrc}
                alt={featuredProductsInfo.image3Title}
              />
              <div
                className={classNames(
                  { [styles.imageTitle]: screens },
                  { [styles.imageTitleXs]: screens.xs }
                )}
              >
                {featuredProductsInfo.image3Title}
              </div>
            </Link>
          </section>
        </section>
        {/* flexbox end */}
      </div>
    </MainContainer>
  );
}
