import { useState } from "react";

import CartItem from "./CartItem";

import styles from "./Cart.module.css";

import mockProductData from "./mockProductData";

function Cart() {
  const [productData, setProductData] = useState(mockProductData);

  console.log("rendered");

  return (
    <div className={styles.container}>
      <h1>Your cart</h1>
      <table>
        <tbody>
          <tr className={styles.tableRowBottomBorder}>
            <th>&nbsp;</th>
            <th className={styles.productNameAndImage}>Product</th>
            <th className={styles.centerCol}>Unit price</th>
            <th className={styles.centerCol}>Quantity</th>
            <th className={styles.centerCol}>Total</th>
          </tr>
          {productData.map((item) => (
            <CartItem
              key={item.id}
              productName={item.productName}
              price={item.price}
              imageUrl={item.imageUrl}
            />
          ))}
          <tr>
            <td colSpan="4"></td>
            <td className={styles.finalTotal}>Total Price: XXXX BDT</td>
          </tr>
          <tr>
            <td colSpan="4"></td>
            <td className={styles.checkoutButtonLayout}>
              <button block className={styles.buttonStyle}>
                Checkout
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div className={styles.emptySpace}></div>
    </div>
  );
}

export default Cart;
