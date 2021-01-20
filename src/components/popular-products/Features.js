import React from 'react';
import { Row, Col } from 'antd';
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

function Features() {
  return (
    <div className="product-list">
      <div className="container py-5">
        <div className="title-holder">
          <h2>POPULAR PRODUCTS</h2>
        </div>
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <Card
              hoverable
              cover={
                <img
                  alt="Creative Adidas T-Shirts"
                  src={image1}
                  style={mystyle}
                />
              }
            >
              <Meta title="Creative Adidas T-Shirts" className="mb-2" />
              <span>&#36;250</span>
            </Card>
          </Col>

          <Col span={6}>
            <Card
              hoverable
              cover={<img alt="Mango-Navy" src={image2} style={mystyle} />}
            >
              <Meta title="Mango-Navy" className="mb-2" />
              <span>&#36;250</span>
            </Card>
          </Col>

          <Col span={6}>
            <Card
              hoverable
              cover={
                <img
                  alt="Gravida Est Quis Euismod"
                  src={image3}
                  style={mystyle}
                />
              }
            >
              <Meta title="Gravida Est Quis Euismod" className="mb-2" />
              <span>&#36;250</span>
            </Card>
          </Col>

          <Col span={6}>
            <Card
              hoverable
              cover={
                <img alt="Donec Condimentum Fer" src={image4} style={mystyle} />
              }
            >
              <Meta title="Donec Condimentum Fer" className="mb-2" />
              <span>&#36;250</span>
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={6}>
            <Card
              hoverable
              cover={
                <img
                  alt="Creative Adidas T-Shirts"
                  src={image5}
                  style={mystyle}
                />
              }
            >
              <Meta title="Creative Adidas T-Shirts" className="mb-2" />
              <span>&#36;250</span>
            </Card>
          </Col>

          <Col span={6}>
            <Card
              hoverable
              cover={<img alt="Mango-Navy" src={image6} style={mystyle} />}
            >
              <Meta title="Mango-Navy" className="mb-2" />
              <span>&#36;250</span>
            </Card>
          </Col>

          <Col span={6}>
            <Card
              hoverable
              cover={
                <img
                  alt="Gravida Est Quis Euismod"
                  src={image7}
                  style={mystyle}
                />
              }
            >
              <Meta title="Gravida Est Quis Euismod" className="mb-2" />
              <span>&#36;250</span>
            </Card>
          </Col>

          <Col span={6}>
            <Card
              hoverable
              cover={
                <img alt="Donec Condimentum Fer" src={image8} style={mystyle} />
              }
            >
              <Meta title="Donec Condimentum Fer" className="mb-2" />
              <span>&#36;250</span>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Features;
