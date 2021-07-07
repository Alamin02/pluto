import { Card, Badge } from "antd";
import styles from "./ProductCard.module.css";

const { Meta } = Card;

const cardStyle = {
  height: 250,
  objectFit: "contain",
  padding: "1rem",
};

const productTitleStyle = {
  color: "red",
  paddingBottom: "1rem",
  marginLeft: "-0.5rem",
};

const priceStyle = {
  marginLeft: "-0.5rem",
  marginBottom: "-0.5rem",
};

const CardItem = ({ title, src, price, discount }) => {
  if (discount) {
    return (
      <Badge.Ribbon color="red" text={discount + ` % off`}>
        <Card
          hoverable
          headStyle={productTitleStyle}
          cover={<img alt={title} src={src} style={cardStyle} />}
        >
          <Meta style={productTitleStyle} title={title} />
          <p style={priceStyle}>
            <strike className={styles.deletePrice}>{price}</strike>
            <span className={styles.priceHighlight}>
              {Math.floor(price - (price * discount) / 100)}
              <span className={styles.currencySign}>৳</span>
            </span>
          </p>
        </Card>
      </Badge.Ribbon>
    );
  } else {
    return (
      <Card
        hoverable
        headStyle={productTitleStyle}
        cover={<img alt={title} src={src} style={cardStyle} />}
      >
        <Meta style={productTitleStyle} title={title} />
        <p style={priceStyle}>
          <span className={styles.priceHighlight}>
            {price}
            <span className={styles.currencySign}>৳</span>
          </span>
        </p>
      </Card>
    );
  }
};

export default CardItem;
