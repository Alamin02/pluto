import React, { useState } from "react";
import { Row, Col, Space, Anchor } from "antd";
import { UserOutlined } from "@ant-design/icons";
import image1_large from "../../assets/images/watch-1-large.jpg";
import image1 from "../../assets/images/watch-1-small.jpg";
import image2 from "../../assets/images/watch-2-small.jpg";
import image3 from "../../assets/images/watch-3-small.jpg";
import image4 from "../../assets/images/watch-4-small.jpg";
import styles from "./ProductView.module.css";
import ButtonStyled from "../ButtonStyled";
import RatingAndDescription from "./RatingAndDescription";
import PriceAndSummary from "./PriceAndSummary";
import Category from "./Category";

const summaryText = `But I must explain to you how all this mistaken idea of ouncing and
aising pain was born and I will give you a complete count of ut I must
explain to you how all this aken idea of enouncing pleasure born and I
will give you a complete account of`;

const descriptionText = `
A watch is a portable timepiece intended to be carried or worn by
 a living being. It is designed to keep a consistent movement 
 despite the motions caused by the person's activities. 
`;
const productName = "Gravida Est quist Euousmod";
const ProductPrice = 199.99;

const ProductImage = ({ imageLink, onClick }) => {
  return (
    <Col>
      <div className={styles.imageSmall}>
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

function ProductView() {
  const [imgSrc, setImgSrc] = useState(image1_large);

  return (
    <Row style={{ marginTop: 50 }} justify="center">
      <Col lg={{ span: 8 }} xs={{ span: 18 }}>
        <div className={styles.imageLarge}>
          <img alt="example" src={imgSrc} />
        </div>
        <Row>
          <ProductImage imageLink={image1} onClick={() => setImgSrc(image1)} />
          <ProductImage imageLink={image2} onClick={() => setImgSrc(image2)} />
          <ProductImage imageLink={image3} onClick={() => setImgSrc(image3)} />
          <ProductImage imageLink={image4} onClick={() => setImgSrc(image4)} />
        </Row>
      </Col>

      <Col xl={{ span: 8 }} xs={{ span: 18 }}>
        <Space size={20} direction="vertical">
          <PriceAndSummary
            summaryText={summaryText}
            productName={productName}
            ProductPrice={ProductPrice}
          />
          <RatingAndDescription
            rating={descriptionText}
            descriptionText={descriptionText}
          />
          <Category />
          <ButtonStyled title={[[<UserOutlined />, "Share This"]]} />
        </Space>
      </Col>
    </Row>
  );
}

export default ProductView;
