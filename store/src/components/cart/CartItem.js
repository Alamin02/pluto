import { useSelector } from "react-redux";
import { Button, Grid } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import classNames from "classnames";
import styles from "./CartItem.module.css";
import QuantityCounter from "./QuantityCounter";

const { useBreakpoint } = Grid;

function CartItem({ id, productName, price, imageUrl, onRemove, description }) {
  const screens = useBreakpoint();
  const productCount = useSelector((state) => state.update.count);

  return (
    <section>
      <div
        className={classNames(
          { [styles.cartItemContainer]: screens },
          { [styles.cartItemContainerXs]: screens.xs }
        )}
      >
        <div
          className={classNames(
            { [styles.closeButtonContainer]: screens },
            { [styles.closeButtonContainerXs]: screens.xs }
          )}
        >
          <Button
            type="text"
            onClick={() => onRemove(id)}
            className={styles.removeFromCartButton}
          >
            <CloseCircleOutlined />
            <p
              className={classNames(
                { [styles.removeFromCartText]: screens },
                { [styles.removeFromCartTextXs]: screens.xs }
              )}
            >
              Remove From Cart
            </p>
          </Button>
        </div>

        <img
          className={classNames(
            { [styles.productImage]: screens },
            { [styles.productImageXs]: screens.xs }
          )}
          src={imageUrl}
          alt={productName}
        />

        <div
          className={classNames(
            { [styles.productInfo]: screens },
            { [styles.productInfoXs]: screens.xs }
          )}
        >
          <h1
            className={classNames(
              { [styles.title]: screens },
              { [styles.titleMd]: screens.md },
              { [styles.titleXl]: screens.xl }
            )}
          >
            {productName}
          </h1>
          <div
            className={classNames(
              { [styles.priceOnSmallScreen]: screens },
              { [styles.priceOnSmallScreenXs]: screens.xs }
            )}
          >
            ৳&nbsp;{price * productCount}
          </div>
          <div className={styles.description}>{description}</div>
          <div
            className={classNames(
              { [styles.counterStyle]: screens },
              { [styles.counterStyleXs]: screens.xs }
            )}
          >
            <QuantityCounter value={productCount} />
          </div>
        </div>

        <div
          className={classNames(
            { [styles.priceOnBigScreen]: screens },
            { [styles.priceOnBigScreenXs]: screens.xs }
          )}
        >
          ৳&nbsp;{price * productCount}
        </div>
      </div>
      <hr className={styles.cartHr} />
    </section>
  );
}

export default CartItem;
