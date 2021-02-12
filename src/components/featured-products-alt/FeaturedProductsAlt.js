import { Link } from "react-router-dom";
import { Grid } from "antd";
import classNames from "classnames";
import styles from "./FeaturedProductsAlt.module.css";

import HeaderSection from "../styled-components/HeaderSection";
import featuredProductsAltInfo from "./featuredProductsAltInfo";

const { useBreakpoint } = Grid;

function FeaturedProductsAlt() {
  const screens = useBreakpoint();

  return (
    <main className={styles.container}>
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
            <Link to={featuredProductsAltInfo.image1Url}>
              <img
                className={classNames(
                  { [styles.firstFlexBoxImage]: screens },
                  { [styles.firstFlexBoxImageXs]: screens.xs }
                )}
                src={featuredProductsAltInfo.image1Src}
                alt={featuredProductsAltInfo.image1Title}
              />
              <div
                className={classNames(
                  { [styles.imageTitle]: screens },
                  { [styles.imageTitleXs]: screens.xs }
                )}
              >
                {featuredProductsAltInfo.image1Title}
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
            <Link to={featuredProductsAltInfo.image2Url}>
              <img
                className={classNames(
                  { [styles.firstFlexBoxImage]: screens },
                  { [styles.firstFlexBoxImageXs]: screens.xs }
                )}
                src={featuredProductsAltInfo.image2Src}
                alt={featuredProductsAltInfo.image2Title}
              />
              <div
                className={classNames(
                  { [styles.imageTitle]: screens },
                  { [styles.imageTitleXs]: screens.xs }
                )}
              >
                {featuredProductsAltInfo.image2Title}
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
          {/* vertical 3rd image */}
          <Link to={featuredProductsAltInfo.image3Url}>
            <img
              className={classNames(
                { [styles.secondFlexBoxImageH]: screens },
                { [styles.secondFlexBoxImageHXs]: screens.xs }
              )}
              src={featuredProductsAltInfo.image3HSrc}
              alt={featuredProductsAltInfo.image3Title}
            />
            {/* horizontal 3rd image */}
            <img
              className={classNames(
                { [styles.secondFlexBoxImageV]: screens },
                { [styles.secondFlexBoxImageVXs]: screens.xs }
              )}
              src={featuredProductsAltInfo.image3VSrc}
              alt={featuredProductsAltInfo.image3Title}
            />
            <div
              className={classNames(
                { [styles.imageTitle]: screens },
                { [styles.imageTitleXs]: screens.xs }
              )}
            >
              {featuredProductsAltInfo.image3Title}
            </div>
          </Link>
        </section>
      </section>
      {/* flexbox end */}
    </main>
  );
}

export default FeaturedProductsAlt;
