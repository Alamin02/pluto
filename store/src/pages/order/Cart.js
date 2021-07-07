import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "antd";
import { Link } from "react-router-dom";
import CartItem from "../../components/cart/CartItem";
import HeaderSection from "../../components/styled-components/HeaderSection";
import styles from "./Cart.module.css";
import MainContainer from "../../components/layout/MainContainer";

function Cart() {
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.cart.products);

  useEffect(() => {
    let price = 0;
    let offerPrice;
    productList.forEach((product) => {
      price += product.price * product.quantity;
      localStorage.setItem("product", product);
      if (product.offer) {
        offerPrice = Math.floor(price - (price * product.offer.discount) / 100);
        setTotalPrice(offerPrice);
      } else {
        setTotalPrice(price);
      }
    });

    localStorage.setItem("productList", JSON.stringify(productList));
  }, [productList, totalPrice, setTotalPrice]);

  const handleRemoveProduct = (id) => {
    dispatch({ type: "cart/removeProduct", payload: { id } });
  };

  if (!productList.length) {
    return (
      <MainContainer>
        <div
          style={{
            textAlign: "center",
            margin: "5rem 0",
          }}
        >
          <h3>Your cart is empty</h3>
          <br />
          <Link to="/">
            <Button type="primary">Start shopping now</Button>
          </Link>
        </div>
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      <div className={styles.container}>
        <HeaderSection headerText="your cart" />
        <hr className={styles.cartHr} />
        {productList.map((item) => (
          <CartItem
            key={item.id}
            id={item.id}
            productName={item.name}
            price={item.price}
            imageUrl={item.images[0].path}
            onRemove={handleRemoveProduct}
            description={item.description}
            quantity={item.quantity}
            offer={item.offer}
          />
        ))}
        <div className={styles.bottomSection}>
          {/* <div>&nbsp;</div> */}
          <div>
            <p className={styles.totalPriceSection}>
              Total Price: {totalPrice} BDT
            </p>
          </div>
        </div>

        <div className={styles.bottomSection}>
          <div>&nbsp;</div>
          <div>
            <Link to="checkout">
              <Button type="primary" style={{ textTransform: "uppercase" }}>
                Checkout
              </Button>
            </Link>
          </div>
        </div>
        <div className={styles.emptySpace}></div>
      </div>
    </MainContainer>
  );
}

export default Cart;
