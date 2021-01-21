import React from 'react';
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';
import { Button } from 'antd';
import './features.css';

import image1 from '../../assets/images/addidas.jpg';
import image2 from '../../assets/images/mango-navy.jpg';
import image3 from '../../assets/images/neck-tshirt.jpg';
import image4 from '../../assets/images/polo-tshirt.jpg';
import image5 from '../../assets/images/black.jpg';
import image6 from '../../assets/images/casual.jpg';
import image7 from '../../assets/images/denim-tshirt.jpg';
import image8 from '../../assets/images/full-black.jpg';

import { Card } from 'antd';

const { Meta } = Card;

const mystyle = {
  height: 250,
  objectFit: 'cover',
};

const CardItem = (props) => {
  return (
    <Col span={6}>
      <Card
        hoverable
        cover={<img alt={props.title} src={props.src} style={mystyle} />}
      >
        <Meta title={props.title} />
        <span>&#36;{props.price}</span>
      </Card>
    </Col>
  );
};

function Features() {
  return (
    <div className="container-fluid">
      <div className="title-holder">
        <h2>POPULAR PRODUCTS</h2>
      </div>
      <Row gutter={[16, 16]}>
        <CardItem title="Creative Adidas T-Shirts" src={image1} price="00" />
        <CardItem title="Mango-Navy" src={image2} price="100" />
        <CardItem title="Gravida Est Quis Euismod" src={image3} price="150" />
        <CardItem title="Donec Condimentum Fer" src={image4} price="170" />
        <CardItem title="Creative Adidas T-Shirts" src={image5} price="190" />
        <CardItem title="Mango-Navy" src={image6} price="200" />
        <CardItem title="Gravida Est Quis Euismod" src={image7} price="250" />
        <CardItem title="Donec Condimentum Fer" src={image8} price="300" />
      </Row>
      <div className="view-products">
        <Button type="link" className="my-button">
          View all products
        </Button>
      </div>
    </div>
  );
}

export default Features;
