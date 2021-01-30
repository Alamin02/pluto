import { Row, Col, Typography } from "antd";

import styles from "./Feature.module.css";
import FeatureImage from "./FeatureImage";
import FeatureOverlay from "./FeatureOverlay";
import Heading from "../heading/Heading";

import watchImage from "../../assets/images/watch.jpg";
import glassImage from "../../assets/images/glass.jpg";
import bagpackImage from "../../assets/images/bagpack.jpg";

const { Link } = Typography;

const FeatureProducts = () => {
  return (
    <>
      <div className={`${styles.bgColor} ${styles.block}`}>
        <div className={styles.containerFluid}>
          <Heading
            headingStyle={styles.titleHolder}
            headingTitle="Feature Products"
          />          
          <Row>
            <Col span={16}>
              {/* Image of Watch */}
              <Row>
                <div className={`${styles.container} ${styles.image}`}>            
                  <Link>
                    <FeatureImage     
                      blur={styles.blur}
                      source={watchImage}
                      style={{
                        border: "1px solid black",
                        objectFit: "cover",                        
                        marginBottom: "10px",
                        height: "395px",
                        width: "780px"
                      }}                                          
                    />
                  </Link>                  
                  <FeatureOverlay
                    overlayStyle = {styles.overlay}
                    name="Watch"
                  />
               </div>
              </Row>
              {/* Image of Glass */}
              <Row>
                <div className={`${styles.container} ${styles.image}`}>
                  <Link>
                    <FeatureImage
                      blur={styles.blur}
                      source={glassImage}
                      style={{ 
                        border: "1px solid black", 
                        objectFit: "cover",
                        height: "395px",
                        width: "780px"
                      }}
                    />
                  </Link>                                                                 
                  <FeatureOverlay
                    overlayStyle = {styles.overlayGlass}
                    name="Glass"
                  />
                </div>
              </Row>
            </Col>
            <Col span={8}>
              {/* Image of Bagpack */}
              <div className={`${styles.container} ${styles.bagpackImage}`}>
                <Link>
                  <FeatureImage 
                    blur={styles.blur}
                    source = {bagpackImage}
                    style={{
                      margin: "0 0 0 15px",
                      border: "1px solid black",
                      objectFit: "cover",
                      height: "805px",
                    }}
                  />
                </Link>
                <FeatureOverlay
                    overlayStyle = {styles.overlayBagpack}
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

export default FeatureProducts;
