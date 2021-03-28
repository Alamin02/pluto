import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Grid } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import classNames from "classnames";
import styles from "./CartItem.module.css";
import QuantityCounter from "./QuantityCounter";

const { useBreakpoint } = Grid;

function CartItem({
  id,
  productName,
  price,
  imageUrl,
  onRemove,
  description,
  quantity,
}) {
  const screens = useBreakpoint();

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
          <Link to={`/products/${id}`}>
            <h1
              className={classNames(
                { [styles.title]: screens },
                { [styles.titleMd]: screens.md },
                { [styles.titleXl]: screens.xl }
              )}
            >
              {productName}
            </h1>
          </Link>

          <div
            className={classNames(
              { [styles.priceOnSmallScreen]: screens },
              { [styles.priceOnSmallScreenXs]: screens.xs }
            )}
          >
            ৳&nbsp;{price * quantity}
          </div>
          <div className={styles.description}>{description}</div>
          <div
            className={classNames(
              { [styles.counterStyle]: screens },
              { [styles.counterStyleXs]: screens.xs }
            )}
          >
            <QuantityCounter value={quantity} productId={id} />
          </div>
        </div>

        <div
          className={classNames(
            { [styles.priceOnBigScreen]: screens },
            { [styles.priceOnBigScreenXs]: screens.xs }
          )}
        >
          ৳&nbsp;{price * quantity}
        </div>
      </div>
      <hr className={styles.cartHr} />
    </section>
  );
}

export default CartItem;
