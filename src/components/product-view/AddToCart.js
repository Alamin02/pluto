import React from "react";
import ButtonStyled from "../ButtonStyled";
import { Radio, InputNumber } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import styles from "./ProductView.module.css";
export default function AddToCart() {
  return (
    <div>
      <Radio.Group>
        <Radio.Button >
          <MinusOutlined />
        </Radio.Button>
        <InputNumber
          min={1}
          max={20}
          className={styles.inputStyled}
          defaultValue={1}
        />
        <Radio.Button>
          <PlusOutlined />
        </Radio.Button>
      </Radio.Group>
      <br />
      <ButtonStyled title="Add to Cart" />
    </div>
  );
}
