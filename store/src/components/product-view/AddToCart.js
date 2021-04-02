import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Radio, InputNumber, Button } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import openNotification from "../notification/openNotification";

import styles from "./ProductView.module.css";
import { Link } from "react-router-dom";

export default function AddToCart({ product }) {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.cart.products);

  const productOnCart = productList.find(
    (_product) => _product.id === product.id
  );

  const productQuantity = (productOnCart && productOnCart.quantity) || 1;

  const handleAddToCart = () => {
    dispatch({ type: "cart/addProduct", payload: product });
    openNotification({ productTitle: product.name, type: "success" });
  };

  const handlePlusButton = () => {
    dispatch({
      type: "cart/updateQuantity",
      payload: { productId: product.id, quantity: productQuantity + 1 },
    });
  };

  const handleMinusButton = () => {
    if (productQuantity > 0)
      dispatch({
        type: "cart/updateQuantity",
        payload: { productId: product.id, quantity: productQuantity - 1 },
      });
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
          value={productQuantity}
        />
        <Radio.Button onClick={() => handlePlusButton()}>
          <PlusOutlined />
        </Radio.Button>
      </Radio.Group>
      <br />
      {productOnCart ? (
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
