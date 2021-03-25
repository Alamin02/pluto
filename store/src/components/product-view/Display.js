import { useState } from "react";
import { Image, Col, Row } from "antd";

import styles from "./Display.module.css";

const ProductImage = ({ imageLink, onClick }) => {
  return (
    <Col span={6}>
      <div>
        <img
          className={styles.previewActive}
          alt="example"
          onClick={onClick}
          src={imageLink}
        />
      </div>
    </Col>
  );
};

function Display({ images }) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className={styles.imageWrapper}>
      <div className={styles.imgStyled}>
        <Image src={selectedImage.path} alt="example" />
      </div>
      <Row gutter={[6, 6]} style={{ marginTop: "2px" }}>
        {images &&
          images.length &&
          images.map((image) => (
            <ProductImage
              key={image + Math.random()}
              imageLink={image.path}
              onClick={() => setSelectedImage(image)}
            />
          ))}
      </Row>
    </div>
  );
}

export default Display;
