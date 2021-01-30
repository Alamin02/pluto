import { ArrowRightOutlined } from "@ant-design/icons";
import { Row, Col, Image, Typography } from "antd";
import styles from "./Feature.module.css";
import FeatureImage from "./FeatureImage";

import watchImage from "../../assets/images/watch.jpg";
import glassImage from "../../assets/images/glass.jpg";
import bagpackImage from "../../assets/images/bagpack.jpg";

const { Link } = Typography;

const FeatureProducts = () => {
  return (
    <>
      <div className={`${styles.bgColor} ${styles.block}`}>
        <div className={styles.containerFluid}>
          <div className={styles.titleHolder}>
            <h2>Feature Products</h2>
          </div>
          <Row>
            <Col span={16}>
              {/* Image of Watch */}
              <Row>
                <div className={`${styles.container} ${styles.image}`}>
                  <Link>
                    <FeatureImage
                      source={watchImage}
                      style={{
                        marginBottom: "10px",
                        border: "1px solid black",
                        objectFit: "cover",
                      }}
                    />
                  </Link>                  
                  {/*<div className="overlay">
                    <Link href="#" target="_blank" style={{ color: "white" }}>
                      Watch
                      <ArrowRightOutlined />
                    </Link>
                  </div>*/}
                </div>
              </Row>
              {/* Image of Glass */}
              <Row>
                <div className={`${styles.container} ${styles.image}`}>
                  <FeatureImage
                    source={glassImage}
                    style={{ 
                      border: "1px solid black", 
                      objectFit: "cover",
                    }}
                  />
                  {/* <div className="overlayGlass">
                    <Link href="#" target="_blank" style={{ color: "white" }}>
                      Glass
                      <ArrowRightOutlined />
                    </Link>
                  </div> */}
                </div>
              </Row>
            </Col>
            <Col span={8}>
              {/* Image of Bagpack */}
              <FeatureImage 
                  source = {bagpackImage}
                  style={{
                    margin: "0 0 0 15px",
                    border: "1px solid black",
                    objectFit: "cover",
                    height: "1050px",
                  }}
              />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default FeatureProducts;
