import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Space, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

import styles from "./ProductView.module.css";
import Collapsible from "./Collapsible";
import AddToCart from "./AddToCart";
import Display from "./Display";

function ProductView({ product }) {
  const { name, price, images, summary, description } = product;

  return (
    <div className={styles.container}>
      <Row justify="center">
        <Col sm={18} md={12} lg={12}>
          <div style={{ padding: "20px" }}>
            <Display images={images} />
          </div>
        </Col>
        <Col sm={18} md={12} lg={12}>
          <div style={{ padding: "20px" }}>
            <Space size={20} direction="vertical">
              <div>
                <h1>{name}</h1>
                <b>৳&nbsp;{price}</b>
                <p>{summary}</p>
              </div>

              <AddToCart product={product} />
              <Collapsible title="Description" body={description} />

              {/* <Category /> */}

              <Link to="/">
                <Button
                  type="primary"
                  icon={<ArrowLeftOutlined />}
                  style={{ textTransform: "capitalize" }}
                >
                  go to home page
                </Button>
              </Link>
            </Space>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ProductView;
