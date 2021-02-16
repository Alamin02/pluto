import React from "react";
import { Row, Col } from "antd";
import { Link, BrowserRouter as Router } from "react-router-dom";

// import bkash from "../../assets/images/black.jpg";
// import cashOn from "../../assets/images/handcash.jpg";
// import styles from "./CheckOut.module.css";

export default function PaymentMethod() {
  return (
    <div>
      <Router>
        <Row>
          <Col span={8} offset={4}>
            <h3>
              <Link>Bkash</Link>
            </h3>
          </Col>
          <Col span={8}>
            <h3>
              <Link>CashOn Delivery</Link>
            </h3>
          </Col>
        </Row>
      </Router>
    </div>
  );
}
