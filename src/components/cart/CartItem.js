import { Button } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";

import QuantityCounter from "./QuantityCounter";

import styles from "./CartItem.module.css";

function CartItem({ productName, price, imageUrl }) {
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
        <QuantityCounter />
      </td>
      <td className={styles.centerCol}>{price} BDT</td>
    </tr>
  );
}

export default CartItem;
