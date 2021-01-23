import React, { useState } from "react";
import { Row, Col, Button, Radio, Space } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import image1 from "../images/watch-1-large.jpg";
import image2 from "../images/watch-2-small.jpg";
import image3 from "../images/watch-3-small.jpg";
import image4 from "../images/watch-4-small.jpg";
// import '../product.css';
const Description1 = () => {
  return (
    <>
      <div className="margin-c">
        <h1>Gravida Est Quis Euismod</h1>
        <p>
          But I must explain to you how all this mistaken idea of ouncing and
          aising pain was born and I will give you a complete count of ut I must
          explain to you how all this aken idea of enouncing pleasure born and I
          will give you a complete account of
        </p>
      </div>
      <Row>
        <Radio.Group>
          <Radio.Button>
            <PlusOutlined />
          </Radio.Button>
          <Radio.Button>0</Radio.Button>
          <Radio.Button>
            <MinusOutlined />
          </Radio.Button>
        </Radio.Group>
        <Button className="btnblack">Add to cart</Button>
      </Row>
    </>
  );
};
const Description2 = () => {
  return (
    <>
      <h4>Description</h4>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus
        aliquam minima ab accusantium beatae blanditiis impedit, laudantium quae
        dolorem explicabo.
      </p>
    </>
  );
};

function Product() {
  const [imgSrc, setImgSrc] = useState(image1);

  const imgSrcFunc = (e) => {
    e.target.classList.remove("preview-active");
    const pImageSrc = e.target.getAttribute("src");

    setImgSrc(pImageSrc);
  };

  const ProductImg = ({ imgLink }) => {
    return (
      <Col>
        <div className="img2">
          <img
            alt="example"
            className="preview-active"
            onClick={imgSrcFunc}
            src={imgLink}
          />
        </div>
      </Col>
    );
  };
  return (
    <Row style={{ marginTop: 50 }}>
      <Col offset={4}></Col>
      <Col offset={1}>
        <div className="imgs1">
          <img alt="example" src={imgSrc} />
        </div>
        <Row>
          <ProductImg imgLink={image1} />
          <ProductImg imgLink={image2} />
          <ProductImg imgLink={image3} />
          <ProductImg imgLink={image4} />
        </Row>
      </Col>

      <Col span={8}>
        <Description1 />
        <Space size="large" direction="vertical">
          <Description2 />
        </Space>
      </Col>

      <Col offset={4}></Col>
    </Row>
  );
}
export default Product;
