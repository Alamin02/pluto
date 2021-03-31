import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Radio, InputNumber, Button } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import openNotification from "../notification/openNotification";

import styles from "./ProductView.module.css";
import { Link } from "react-router-dom";

export default function AddToCart({ product }) {
  const dispatch = useDispatch();
  const productNumber = useSelector((state) => state.update.count);

  const productList = useSelector((state) => state.cart.products);

  const isProductOnCart = !!productList.find(
    (_product) => _product.id === product.id
  );

  const handleAddToCart = () => {
    dispatch({ type: "cart/addProduct", payload: product });
    openNotification({ productTitle: product.name, type: "success" });
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
      {isProductOnCart ? (
        <Link to="/cart">
          <Button type="primary" style={{ textTransform: "uppercase" }}>
            Visit Cart
          </Button>
        </Link>
      ) : (
        <Button
          type="primary"
          style={{ textTransform: "uppercase" }}
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      )}
    </div>
  );
}
