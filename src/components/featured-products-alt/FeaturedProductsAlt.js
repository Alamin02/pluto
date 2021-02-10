import { Grid } from "antd";
import classNames from "classnames";
import styles from "./FeaturedProductsAlt.module.css";

import HeaderSection from "../styled-components/HeaderSection";

import image1 from "./images/image1.jpg";
import image2 from "./images/image2.jpg";
import image3horizontal from "./images/image3h.jpg";
import image3vertical from "./images/image3v.jpg";

const imageTitles = {
  id: 1,
  image1Title: "Vintage watch",
  image2Title: "Nike shoe",
  image3Title: "Lamp",
};

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
            <img
              className={classNames(
                { [styles.firstFlexBoxImage]: screens },
                { [styles.firstFlexBoxImageXs]: screens.xs }
              )}
              src={image1}
              alt=""
            />
            <div
              className={classNames(
                { [styles.imageTitle]: screens },
                { [styles.imageTitleXs]: screens.xs }
              )}
            >
              {imageTitles.image1Title}
            </div>
          </div>

          <div
            className={classNames(
              { [styles.firstFlexBoxBottomImageContainer]: screens },
              { [styles.firstFlexBoxBottomImageContainerXs]: screens.xs }
            )}
          >
            <img
              className={classNames(
                { [styles.firstFlexBoxImage]: screens },
                { [styles.firstFlexBoxImageXs]: screens.xs }
              )}
              src={image2}
              alt=""
            />
            <div
              className={classNames(
                { [styles.imageTitle]: screens },
                { [styles.imageTitleXs]: screens.xs }
              )}
            >
              {imageTitles.image2Title}
            </div>
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
          <img
            className={classNames(
              { [styles.secondFlexBoxImageH]: screens },
              { [styles.secondFlexBoxImageHXs]: screens.xs }
            )}
            src={image3vertical}
            alt=""
          />
          {/* horizontal 3rd image */}
          <img
            className={classNames(
              { [styles.secondFlexBoxImageV]: screens },
              { [styles.secondFlexBoxImageVXs]: screens.xs }
            )}
            src={image3horizontal}
            alt=""
          />
          <div
            className={classNames(
              { [styles.imageTitle]: screens },
              { [styles.imageTitleXs]: screens.xs }
            )}
          >
            {imageTitles.image3Title}
          </div>
        </section>
      </section>
      {/* flexbox end */}
    </main>
  );
}

export default FeaturedProductsAlt;
