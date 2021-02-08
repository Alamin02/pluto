import React from "react";
import { useDispatch } from "react-redux";
import { Radio, InputNumber } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

import styles from "./ProductView.module.css";
import BlackButton from "../styled-components/ButtonBlack";

export default function AddToCart({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch({ type: "cart/addProduct", payload: product });
  };

  return (
    <div>
      <Radio.Group>
        <Radio.Button>
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
      <BlackButton buttonText="Add to Cart" onClick={handleAddToCart} />
    </div>
  );
}
