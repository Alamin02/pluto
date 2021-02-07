import { useSelector, useDispatch } from "react-redux";

import CartItem from "./CartItem";

import styles from "./Cart.module.css";

function Cart() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.cart.products);

  const handleRemoveProduct = (id) => {
    dispatch({ type: "cart/removeProduct", payload: { id } });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Your cart</h1>
      <table className={styles.cartTable}>
        <tbody>
          <tr className={styles.tableRowBottomBorder}>
            <th>&nbsp;</th>
            <th className={styles.productNameAndImage}>Product</th>
            <th className={styles.centerCol}>Unit price</th>
            <th className={styles.centerCol}>Quantity</th>
            <th className={styles.centerCol}>Total</th>
          </tr>
          {productList.map((item) => (
            <CartItem
              key={item.id}
              id={item.id}
              productName={item.productName}
              price={item.price}
              imageUrl={item.imageUrl}
              onRemove={handleRemoveProduct}
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
