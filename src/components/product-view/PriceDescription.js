import React from "react";
import { Row, Radio } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import styles from "./ProductView.module.css";
import ButtonStyled from "../ButtonStyled";

const Description1Text = `But I must explain to you how all this mistaken idea of ouncing and
aising pain was born and I will give you a complete count of ut I must
explain to you how all this aken idea of enouncing pleasure born and I
will give you a complete account of`;

const Description1 = ({ description }) => {
  return (
    <>
      <div className={styles.marginBottom}>
        <h1>Gravida Est Quis Euismod</h1>
        <h2>
          <b>$ 155.99</b>
        </h2>
        <p>{description}</p>
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
export default function PriceDescription() {
  return (
    <div>
      <Description1 description={Description1Text} />
    </div>
  );
}
