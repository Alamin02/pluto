import { useState } from "react";

import CartItem from "./CartItem";

import styles from "./Cart.module.css";

import mockProductData from "./mockProductData";

function Cart() {
  const [productData, setProductData] = useState(mockProductData);

  console.log("rendered");

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Your cart</h1>
      <table className={styles.cartTable}>
        <tbody>
          <tr className={styles.tableRowBottomBorder}>
            <th>&nbsp;</th>
            <th className={`${styles.productNameAndImage} ${styles.cartTableHead}`}>
              Product
            </th>
            <th className={`${styles.centerCol} ${styles.cartTableHead}`}>
              Unit price
            </th>
            <th className={`${styles.centerCol} ${styles.cartTableHead}`}>
              Quantity
            </th>
            <th className={`${styles.centerCol} ${styles.cartTableHead}`}>
              Total
            </th>
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
