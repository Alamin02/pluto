import React from "react";
import { useDispatch } from "react-redux";
import styles from "./QuantityCounter.module.css";

function QuantityCounter({ value, productId }) {
  const dispatch = useDispatch();

  const handleAddProduct = () => {
    dispatch({
      type: "cart/updateQuantity",
      payload: { productId, quantity: value + 1 },
    });
  };

  const handleRemoveProduct = () => {
    if (value > 0)
      dispatch({
        type: "cart/updateQuantity",
        payload: { productId, quantity: value - 1 },
      });
  };

  return (
    <div className={styles.counterRootDiv}>
      <div className={styles.iconStyle}>
        <button className={styles.buttonStyle} onClick={handleRemoveProduct}>
          <span className={styles.iconStyle}> - </span>
        </button>
      </div>
      <input
        type="text"
        readOnly
        value={value}
        className={styles.counterInput}
      />
      <div>
        <button className={styles.buttonStyle} onClick={handleAddProduct}>
          <span className={styles.iconStyle}> + </span>
        </button>
      </div>
    </div>
  );
}

export default QuantityCounter;
