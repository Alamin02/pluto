import React from "react";
import { Row, Col } from "antd";

import MainHeader from "../components/main-header/MainHeader"
import ProductNavbar from "../components/product/ProductNavbar"
import ProductOption from "../components/product/option/ProductOption"
import CardItem from "../components/product/ProductCard"
import PageInfo from "../components/product/PageInfo"


import image1 from "../assets/images/addidas.jpg";
import image2 from "../assets/images/mango-navy.jpg";
import image3 from "../assets/images/neck-tshirt.jpg";
import image4 from "../assets/images/polo-tshirt.jpg";
import image5 from "../assets/images/black.jpg";
import image6 from "../assets/images/casual.jpg";
import image7 from "../assets/images/denim-tshirt.jpg";
import image8 from "../assets/images/full-black.jpg";


const item = [
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


const ProductPage = () => {
    return (
        <div>
            <MainHeader name='popular list' sub='home - shop - products' />
            <ProductNavbar />
            <ProductOption />
            <Row gutter={[16, 16]} style={{ maxWidth: '1200px', margin: '20px auto' }}>
                {item.map((item) => (
                    <Col span={6} key={item.id}>
                        <CardItem
                            title={item.title}
                            src={item.image}
                            price={item.price}
                        />
                    </Col>
                ))}
            </Row>
            <PageInfo />
        </div>

    )
}
export default ProductPage;

