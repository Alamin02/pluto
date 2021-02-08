import { useSelector, useDispatch } from "react-redux";

import CartItem from "../components/cart/CartItem";
import ButtonBlack from "../components/styled-components/ButtonBlack";

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
      <hr className={styles.cartHr} />
      {productList.map((item) => (
        <CartItem
          key={item.id}
          id={item.id}
          productName={item.productName}
          price={item.price}
          imageUrl={item.imageUrl}
          onRemove={handleRemoveProduct}
          description={item.description}
        />
      ))}
      <div className={styles.bottomSection}>
        <div className={styles.bottomSectionContent}></div>
        <p className={styles.totalPriceSection}>Total Price: XXXX BDT</p>
        <ButtonBlack buttonText="Checkout" className={styles.checkoutButton} />
      </div>
      <div className={styles.emptySpace}></div>
    </div>
  );
}

export default Cart;
