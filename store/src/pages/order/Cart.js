import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { Button } from "antd";
import { Link } from "react-router-dom";
import CartItem from "../../components/cart/CartItem";
import HeaderSection from "../../components/styled-components/HeaderSection";
import styles from "./Cart.module.css";
import MainContainer from "../../components/layout/MainContainer";

function Cart() {
  const [totalPrice, setTotalPrice] = useState(0)
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.cart.products);
  const productCount = useSelector((state) => state.update.count);

  useEffect(() => {
    let price = 0;
    productList.forEach(product => {
      price += product.price * productCount;
    })
    setTotalPrice(price)

  }, [productList, productCount, totalPrice, setTotalPrice])

  const handleRemoveProduct = (id) => {
    dispatch({ type: "cart/removeProduct", payload: { id } });
  };

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
          />
        ))}
        <div className={styles.bottomSection}>
          <div>&nbsp;</div>
          <div>
            <p className={styles.totalPriceSection}>Total Price: {totalPrice} BDT</p>
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
    </MainContainer>
  );
}

export default Cart;
