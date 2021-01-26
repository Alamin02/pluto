import React, { useState } from "react";
import { Row, Col, Radio, Space, Collapse, Anchor } from "antd";
import {
  PlusOutlined,
  MinusOutlined,
  CaretRightOutlined,
  UserOutlined,
} from "@ant-design/icons";
import image1_large from "../../assets/images/watch-1-large.jpg";
import image1 from "../../assets/images/watch-1-small.jpg";
import image2 from "../../assets/images/watch-2-small.jpg";
import image3 from "../../assets/images/watch-3-small.jpg";
import image4 from "../../assets/images/watch-4-small.jpg";
import styles from "./ProductView.module.css";
import ButtonStyled from "../ButtonStyled";
const { Panel } = Collapse;

const Description1Text = `But I must explain to you how all this mistaken idea of ouncing and
aising pain was born and I will give you a complete count of ut I must
explain to you how all this aken idea of enouncing pleasure born and I
will give you a complete account of`;

const Description2Text = ` Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus
aliquam minima ab accusantium beatae blanditiis impedit, laudantium quae
dolorem explicabo.`;

const Description1 = ({ DText }) => {
  return (
    <>
      <div className={styles.marginBottom}>
        <h1>Gravida Est Quis Euismod</h1>
        <h2>
          <b>$ 155.99</b>
        </h2>
        <p>{DText}</p>
      </div>
      <Row>
        <Radio.Group>
          <Radio.Button>
            <MinusOutlined />
          </Radio.Button>
          <Radio.Button>0</Radio.Button>
          <Radio.Button>
            <PlusOutlined />
          </Radio.Button>
        </Radio.Group>

        <ButtonStyled title="Add to Cart" />
      </Row>
    </>
  );
};
const Description2 = ({ DText }) => {
  return (
    <>
      <h4>Description</h4>
      <p>{DText}</p>
    </>
  );
};

const textCollapse = `
A watch is a portable timepiece intended to be carried or worn by
 a living being. It is designed to keep a consistent movement 
 despite the motions caused by the person's activities. 
`;

const DeskCollapse = ({ title, k, text }) => {
  return (
    <Collapse
      expandIconPosition="right"
      bordered={true}
      defaultActiveKey={["1"]}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 0 : 90} />
      )}
    >
      <Panel header={title} key={k}>
        <p>{text}</p>
      </Panel>
    </Collapse>
  );
};
const { Link } = Anchor;
const titleA = [
  { id: "1", title: "Need help?" },
  { id: "2", title: "Contact us" },
  { id: "3", title: "Categories:" },
  { id: "4", title: "MenCollection" },
  { id: "5", title: "Women" },
  { id: "6", title: "tags:" },
  { id: "7", title: "T-shirt" },
  { id: "8", title: "shirt" },
];
const Category = () => {
  return (
    <Anchor affix={false}>
      {titleA.map((t) => (
        <Link className={styles.dInline} href="#" title={t.title} id={t.id} />
      ))}
    </Anchor>
  );
};
function ProductView() {
  const [imgSrc, setImgSrc] = useState(image1_large);
  const imgSrcFunc = (e) => {
    e.target.classList.remove("ProductView_previewActive__3JzWI");
    const pImageSrc = e.target.getAttribute("src");
    setImgSrc(pImageSrc);
  };
  const ProductImg = ({ imgLink }) => {
    return (
      <Col>
        <div className={styles.img2}>
          <img
            className={styles.previewActive}
            alt="example"
            onClick={imgSrcFunc}
            src={imgLink}
          />
        </div>
      </Col>
    );
  };

  return (
    <Row style={{ marginTop: 50 }} justify="center" gutter={32}>
      <Col>
        <div className={styles.img1}>
          <img alt="example" src={imgSrc} />
        </div>
        <Row>
          <ProductImg imgLink={image1} />
          <ProductImg imgLink={image2} />
          <ProductImg imgLink={image3} />
          <ProductImg imgLink={image4} />
        </Row>
      </Col>
      <Col xl={{ span: 8 }} xs={{ span: 15 }}>
        <Space size={50} direction="vertical">
          <Description1 DText={Description1Text} />
          <Description2 DText={Description2Text} />
        </Space>
        <Space direction="vertical" size={15}>
          <DeskCollapse title="Description" k="1" text={textCollapse} />
          <DeskCollapse title="Ratings(0)" k="2" text={textCollapse} />
          <Category />
          <ButtonStyled title={[[<UserOutlined />, "Share This"]]} />
        </Space>
      </Col>
    </Row>
  );
}
export default ProductView;
