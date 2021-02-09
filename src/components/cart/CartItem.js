import { useState } from "react";

import { Button } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";

import QuantityCounter from "./QuantityCounter";

import styles from "./CartItem.module.css";

function CartItem({ id, productName, price, imageUrl, onRemove, description }) {
  const [count, setCount] = useState(1);

  const handleCount = (value) => {
    if (value > 0) setCount(value);
  };

  return (
    <section className={styles.cartItemOuterContainer}>
      <div className={styles.cartItemInnerContainer}>
        <div className={styles.closeButtonContainer}>
          <Button
            type="text"
            onClick={() => onRemove(id)}
            className={styles.removeFromCart}
          >
            <CloseCircleOutlined />
            <p className={styles.removeFromCartText}>Remove From Cart</p>
          </Button>
        </div>
        <img className={styles.productImage} src={imageUrl} alt={productName} />
        <div className={styles.productInfo}>
          <h1 className={styles.title}>{productName}</h1>
          <div className={styles.priceOnSmallScreen}>{price} BDT</div>
          <div className={styles.description}>{description}</div>
          <div className={styles.counterStyle}>
            <QuantityCounter value={count} onChange={handleCount} />
          </div>
        </div>
      </div>
      <hr className={styles.cartHr} />
      <div className={styles.priceOnBigScreen}>{price * count} BDT</div>
    </section>
  );
}

export default CartItem;
