import { Card } from "antd";

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

const CardItem = ({ title, src, price }) => {
  return (
    <Card
      hoverable
      headStyle={productTitleStyle}
      cover={<img alt={title} src={src} style={cardStyle} />}
    >
      <Meta style={productTitleStyle} title={title} />
      <p style={priceStyle}>
        <b>
          {/* <sup> ৳</sup>&nbsp;{price} */}
          ৳&nbsp;{price}
        </b>
      </p>
    </Card>
  );
};

export default CardItem;
