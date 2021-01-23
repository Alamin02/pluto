import { Card } from "antd";

const { Meta } = Card;

const mystyle = {
  height: 250,
  objectFit: "cover",
};

const CardItem = ({ title, src, price }) => {
  return (
    <Card hoverable cover={<img alt={title} src={src} style={mystyle} />}>
      <Meta title={title} />
      <span>&#36;{price}</span>
    </Card>
  );
};

export default CardItem;
