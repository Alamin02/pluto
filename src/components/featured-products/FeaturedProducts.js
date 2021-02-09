import { Row, Col, Typography } from "antd";
import classNames from "classnames";

import styles from "./Featured.module.css";
import FeaturedImage from "./FeaturedImage";
import FeaturedOverlay from "./FeaturedOverlay";
import Heading from "../heading/Heading";

import watchImage from "../../assets/images/watch.jpg";
import glassImage from "../../assets/images/glass.jpg";
import bagpackImage from "../../assets/images/bagpack.jpg";

const { Link } = Typography;

const FeaturedProducts = () => {
  return (
    <>
      <div className={classNames(styles.bgColor, styles.block)}>
        <div className={styles.containerFluid}>
          <Heading
            headingStyle={styles.titleHolder}
            headingTitle="Featured Products"
          />
          <Row>
            <Col span={16}>
              {/* Image of Watch */}
              <Row>
                <div className={classNames(styles.container, styles.image)}>
                  <Link>
                    <FeaturedImage
                      blur={styles.blur}
                      source={watchImage}
                      style={{
                        objectFit: "cover",
                        marginBottom: "10px",
                        height: "395px",
                        width: "780px",
                      }}
                    />
                  </Link>
                  <FeaturedOverlay overlayStyle={styles.overlay} name="Watch" />
                </div>
              </Row>
              {/* Image of Glass */}
              <Row>
                <div className={classNames(styles.container, styles.image)}>
                  <Link>
                    <FeaturedImage
                      blur={styles.blur}
                      source={glassImage}
                      style={{
                        objectFit: "cover",
                        height: "395px",
                        width: "780px",
                      }}
                    />
                  </Link>
                  <FeaturedOverlay
                    overlayStyle={styles.overlayGlass}
                    name="Glass"
                  />
                </div>
              </Row>
            </Col>
            <Col span={8}>
              {/* Image of Bagpack */}
              <div
                className={classNames(styles.container, styles.bagpackImage)}
              >
                <Link>
                  <FeaturedImage
                    blur={styles.blur}
                    source={bagpackImage}
                    style={{
                      margin: "0 0 0 15px",
                      objectFit: "cover",
                      height: "805px",
                    }}
                  />
                </Link>
                <FeaturedOverlay
                  overlayStyle={styles.overlayBagpack}
                  name="Bagpack"
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default FeaturedProducts;
