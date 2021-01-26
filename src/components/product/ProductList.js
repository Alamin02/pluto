import React from "react";
import { Row, Col } from "antd";
import { Button } from "antd";
import styles from "./ProductList.module.css";

import image1 from "../../assets/images/addidas.jpg";
import image2 from "../../assets/images/mango-navy.jpg";
import image3 from "../../assets/images/neck-tshirt.jpg";
import image4 from "../../assets/images/polo-tshirt.jpg";
import image5 from "../../assets/images/black.jpg";
import image6 from "../../assets/images/casual.jpg";
import image7 from "../../assets/images/denim-tshirt.jpg";
import image8 from "../../assets/images/full-black.jpg";

import CardItem from "./ProductCard";
import Header from "./Header";
import ViewButton from './Button'

const itemList = [
    {
        id: 1,
        title: "Creative Adidas T-Shirts",
        image: image1,
        price: "00",
    },
    {
        id: 2,
        title: "Mango-Navy",
        image: image2,
        price: "157",
    },
    {
        id: 3,
        title: "Gravida Est Quis Euismod",
        image: image3,
        price: "170",
    },
    {
        id: 4,
        title: "Gravida Est Quis Euismod",
        image: image4,
        price: "170",
    },
    {
        id: 5,
        title: "Gravida Est Quis Euismod",
        image: image5,
        price: "170",
    },
    {
        id: 6,
        title: "Gravida Est Quis Euismod",
        image: image6,
        price: "170",
    },
    {
        id: 7,
        title: "Gravida Est Quis Euismod",
        image: image7,
        price: "170",
    },
    {
        id: 8,
        title: "Gravida Est Quis Euismod",
        image: image8,
        price: "170",
    },
];

function ProductList() {
    return (
        <div className={styles.containerFluid}>
            <Header title='popular products' />
            <Row gutter={[16, 16]}>
                {itemList.map((item) => (
                    <Col span={6} key={item.id}>
                        <CardItem
                            title={item.title}
                            src={item.image}
                            price={item.price}
                        />
                    </Col>
                ))}
            </Row>
            <div className="view-products">
                <ViewButton type='link' />
            </div>
        </div>
    );
}

export default ProductList;