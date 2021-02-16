import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Radio, InputNumber } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import openNotification from "../notification/openNotification";

import styles from "./ProductView.module.css";
import BlackButton from "../styled-components/ButtonBlack";

export default function AddToCart({ product }) {
  const dispatch = useDispatch();
  const productNumber = useSelector((state) => state.update.count);

  const handleAddToCart = () => {
    dispatch({ type: "cart/addProduct", payload: product });
    openNotification({ productTitle: product.productName, type: "success" });
  };
  const handlePlusButton = () => {
    dispatch({ type: "Add" });
  };
  const handleMinusButton = () => {
    dispatch({ type: "Remove" });
  };

  return (
    <div>
      <Radio.Group>
        <Radio.Button onClick={() => handleMinusButton()}>
          <MinusOutlined />
        </Radio.Button>
        <InputNumber
          min={1}
          max={20}
          step={1}
          className={styles.inputStyled}
          defaultValue={productNumber}
          value={productNumber}
        />
        <Radio.Button onClick={() => handlePlusButton()}>
          <PlusOutlined />
        </Radio.Button>
      </Radio.Group>
      <br />
      <BlackButton buttonText="Add to Cart" onClick={handleAddToCart} />
    </div>
  );
}
