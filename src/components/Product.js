import React, { useState } from "react";
import { Row, Col, Button, Radio, Space } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import image1 from "../images/watch-1-large.jpg";
import image2 from "../images/watch-2-small.jpg";
import image3 from "../images/watch-3-small.jpg";
import image4 from "../images/watch-4-small.jpg";
// import '../product.css';
const ProductImg = ({ imglink }) => {
  return (
    <div className="img2">
      <img alt="example" src={imglink} />
    </div>
  );
};
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
            {" "}
            <PlusOutlined />
          </Radio.Button>
          <Radio.Button>0</Radio.Button>
          <Radio.Button>
            {" "}
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
  return (
    <Row style={{ marginTop: 50 }}>
      <Col offset={4}></Col>
      <Col offset={1}>
        <div className="imgs1">
          <img alt="example" src={image1} />
        </div>
        <Row>
          <Col>
            <ProductImg imglink={image1} />
          </Col>
          <Col>
            <ProductImg imglink={image2} />
          </Col>
          <Col>
            <ProductImg imglink={image3} />
          </Col>
          <Col>
            <ProductImg imglink={image4} />
          </Col>
        </Row>
      </Col>

      <Col span={8}>
        <Description1 />

        <Space size="large" direction="vertical">
          {" "}
          <Description2 />
        </Space>
      </Col>

      <Col offset={4}></Col>
    </Row>
  );
}
export default Product;
