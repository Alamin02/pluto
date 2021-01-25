import { Row, Col } from "antd";

import styles from "./ProductDetails.module.css";

import img1 from "./images/samsung1.jpg";
import img2 from "./images/samsung2.jpg";
import img3 from "./images/samsung3.jpg";
import img4 from "./images/samsung4.jpg";

const productImages = [
  {
    id: 1,
    imgFile: img1,
  },
  {
    id: 2,
    imgFile: img2,
  },
  {
    id: 3,
    imgFile: img3,
  },
  {
    id: 4,
    imgFile: img4,
  },
];

function ProductImageFull(props) {
  return (
    <img
      className={`${styles.imgStyle} ${styles.prodImageFullStyle}`}
      src={props.imgSrc}
      alt=""
    />
  );
}

function ProductImageThumbnail(props) {
  return <img className={styles.imgStyle} src={props.imgSrc} alt="" />;
}

function ProductDetails() {
  return (
    <div className={styles.container}>
      <Row gutter={{ xs: 10, sm: 22, md: 30, lg: 40 }}>
        <Col span={12}>
          <div>
            <ProductImageFull imgSrc={img1} />
          </div>
          <Row gutter={{ xs: 2, sm: 4, md: 6, lg: 8 }}>
            {productImages.map((productImageEach) => (
              <Col key={productImageEach.id} span={6}>
                <ProductImageThumbnail imgSrc={productImageEach.imgFile} />
              </Col>
            ))}
          </Row>
        </Col>
        <Col span={12}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Vestibulum
          rhoncus est pellentesque elit ullamcorper. Sed egestas egestas
          fringilla phasellus. Tempor nec feugiat nisl pretium fusce id.
          Pellentesque habitant morbi tristique senectus et netus et malesuada
          fames. Massa tempor nec feugiat nisl pretium fusce id. Vestibulum
          lorem sed risus ultricies tristique nulla aliquet enim tortor. Urna
          duis convallis convallis tellus id interdum. Ut diam quam nulla
          porttitor massa id neque aliquam vestibulum. Enim nulla aliquet
          porttitor lacus. Rhoncus aenean vel elit scelerisque mauris
          pellentesque pulvinar. Aliquet risus feugiat in ante.
        </Col>
      </Row>
    </div>
  );
}

export default ProductDetails;
