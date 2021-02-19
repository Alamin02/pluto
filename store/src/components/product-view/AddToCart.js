import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Radio, InputNumber } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import openNotification from "../notification/openNotification";

import styles from "./ProductView.module.css";
import BlackButton from "../styled-components/ButtonBlack";
export default function AddToCart({ product }) {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.cart.products);

  const isProductOnCart = !!productList.find(
    (_product) => _product.id === product.id
  );

  const handleAddToCart = () => {
    dispatch({ type: "cart/addProduct", payload: product });
    openNotification({ productTitle: product.productName, type: "success" });
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
          step={1}
          className={styles.inputStyled}
          defaultValue={1}
        />
        <Radio.Button>
          <PlusOutlined />
        </Radio.Button>
      </Radio.Group>
      <br />
      {isProductOnCart ? (
        <BlackButton buttonText="Visit Cart" />
      ) : (
        <BlackButton buttonText="Add to Cart" onClick={handleAddToCart} />
      )}
    </div>
  );
}
