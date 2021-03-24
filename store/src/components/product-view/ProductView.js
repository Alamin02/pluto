import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Row, Col, Space, Button } from "antd";

import { Image } from "antd";
import image1 from "../../assets/images/watch-1-small.jpg";
import image2 from "../../assets/images/watch-2-small.jpg";
import image3 from "../../assets/images/watch-3-small.jpg";
import image4 from "../../assets/images/watch-4-small.jpg";
import styles from "./ProductView.module.css";
import RatingAndDescription from "./RatingAndDescription";
import PriceAndSummary from "./PriceAndSummary";
import Category from "./Category";
import AddToCart from "./AddToCart";

const summaryText = `But I must explain to you how all this mistaken idea of ouncing and
aising pain was born and I will give you a complete count of ut I must
explain to you how all this aken idea of enouncing pleasure born and I
will give you a complete account of`;

const descriptionText = `
A watch is a portable timepiece intended to be carried or worn by
 a living being. It is designed to keep a consistent movement 
 despite the motions caused by the person's activities. 
`;

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

function ProductView({ product }) {
  const { productName, price, imageUrl } = product;
  const [imgSrc, setImgSrc] = useState(imageUrl);
  const productNumber = useSelector((state) => state.update.count);

  return (
    <div className={styles.container}>
      <Row justify="center">
        <Col sm={18} md={12} lg={12}>
          <div style={{ padding: "20px" }}>
            <div className={styles.imageWrapper}>
              <div className={styles.imgStyled}>
                <Image src={imgSrc} alt="example" />
              </div>
              <Row gutter={[6, 6]} style={{ marginTop: "2px" }}>
                <ProductImage
                  imageLink={image1}
                  onClick={() => setImgSrc(image1)}
                />
                <ProductImage
                  imageLink={image2}
                  onClick={() => setImgSrc(image2)}
                />
                <ProductImage
                  imageLink={image3}
                  onClick={() => setImgSrc(image3)}
                />
                <ProductImage
                  imageLink={image4}
                  onClick={() => setImgSrc(image4)}
                />
              </Row>
            </div>
          </div>
        </Col>
        <Col sm={18} md={12} lg={12}>
          <div style={{ padding: "20px" }}>
            <Space size={20} direction="vertical">
              <PriceAndSummary
                summaryText={summaryText}
                productName={productName}
                ProductPrice={price * productNumber}
              />
              <AddToCart product={product} />

              <RatingAndDescription
                rating={descriptionText}
                descriptionText={descriptionText}
              />
              <Category />
              <Button type="primary" style={{ textTransform: "uppercase" }}>
                Share this
              </Button>
            </Space>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ProductView;
