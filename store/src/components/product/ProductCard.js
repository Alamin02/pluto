import { Grid, Card } from "antd";

const { Meta } = Card;
const { useBreakpoint } = Grid;

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
      <Card
        hoverable
        headStyle={productTitleStyle}
        cover={<img alt={title} src={src} style={cardStyle} />}
      >
        <Meta style={productTitleStyle} title={title} />
        <p style={priceStyle}>
          <strike style={{ color: "gray", marginRight: "10px" }}>
            {discount}
          </strike>
          <span style={{ fontSize: "1.5rem", marginRight: "4px" }}>
            {price}
          </span>
          <sup>৳</sup>
        </p>
      </Card>
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
