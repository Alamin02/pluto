import { Card, Badge } from "antd";

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
            <strike style={{ color: "gray", marginRight: "10px" }}>
              {price}
            </strike>
            <span style={{ fontSize: "1.5rem", marginRight: "4px" }}>
              {Math.floor(price - (price * discount) / 100)}
            </span>
            <sup>৳</sup>
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
          <span style={{ fontSize: "1.5rem", marginRight: "4px" }}>
            {price}
          </span>
          <sup>৳</sup>
        </p>
      </Card>
    );
  }
};

export default CardItem;
