import { useSelector, useDispatch } from "react-redux";
import { Button } from "antd";
import { Link } from "react-router-dom";
import CartItem from "../components/cart/CartItem";
import HeaderSection from "../components/styled-components/HeaderSection";
import styles from "./Cart.module.css";
import appStyles from "../App.module.css";

function Cart() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.cart.products);

  const handleRemoveProduct = (id) => {
    dispatch({ type: "cart/removeProduct", payload: { id } });
  };

  return (
    <div className={appStyles.containerMain}>
      <div className={styles.container}>
        <HeaderSection headerText="your cart" />
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
          <div>&nbsp;</div>
          <div>
            <p className={styles.totalPriceSection}>Total Price: XXXX BDT</p>
          </div>
        </div>

        <div className={styles.bottomSection}>
          <div>&nbsp;</div>
          <div>
            <Link to="checkOut">
              <Button type="primary" style={{ textTransform: "uppercase" }}>
                Checkout
              </Button>
            </Link>
          </div>
        </div>
        <div className={styles.emptySpace}></div>
      </div>
    </div>
  );
}

export default Cart;
