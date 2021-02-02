import { useState } from "react";

import { Button } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";

import QuantityCounter from "./QuantityCounter";

import styles from "./CartItem.module.css";

function CartItem({ productName, price, imageUrl }) {
  const [count, setCount] = useState(1);

  const handleCount = (value) => {
    if (value > 0) setCount(value);
  };

  return (
    <tr className={styles.tableRowBottomBorder}>
      <td>
        <Button type="text">
          <CloseCircleOutlined />
        </Button>
      </td>
      <td className={styles.productNameAndImage}>
        <img
          src={imageUrl}
          className={styles.productImage}
          alt="product_image"
        />
        <p className={styles.productName}>{productName}</p>
      </td>
      <td className={styles.centerCol}>{price} BDT</td>
      <td className={styles.centerCol}>
        <QuantityCounter value={count} onChange={handleCount} />
      </td>
      <td className={styles.centerCol}>{price * count} BDT</td>
    </tr>
  );
}

export default CartItem;
