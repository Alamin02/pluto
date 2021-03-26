import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./QuantityCounter.module.css";

function QuantityCounter({ value }) {
  const dispatch = useDispatch();
  const productCount = useSelector((state) => state.update.count);

  const handleAddProduct = () => {
    dispatch({ type: "Add" });
  };
  const handleRemoveProduct = (id) => {
    dispatch({ type: "Remove" });
  };
  return (
    <div className={styles.counterRootDiv}>
      <div className={styles.iconStyle}>
        <button
          className={styles.buttonStyle}
          onClick={handleRemoveProduct}
        >
          <span className={styles.iconStyle}> - </span>
        </button>
      </div>
      <input type="text" readOnly value={value} className={styles.counterInput} />
      <div>
        <button
          className={styles.buttonStyle}
          onClick={handleAddProduct}
        >
          <span className={styles.iconStyle}> + </span>
        </button>
      </div>
    </div>
  );
}

export default QuantityCounter;
