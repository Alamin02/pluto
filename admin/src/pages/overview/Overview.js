import { useState, useEffect } from "react";
import { Row, Col, Card, Typography } from "antd";
import {
  SkinOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
} from "@ant-design/icons";

import { getProducts } from "../../client/products.client";
import { getUsers } from "../../client/users.client";
import { getOrders } from "../../client/orders.client";

const { Text, Title } = Typography;

export default function Overview() {
  const token = localStorage.getItem("token");

  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);

  const [users, setUsers] = useState("");
  const [usersLoading, setUsersLoading] = useState(true);

  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    getProducts().then((res) =>
      res
        .json()
        .then(({ data }) => setProducts(data))
        .then(() => setProductsLoading(false))
    );
  }, []);

  useEffect(() => {
    getUsers(token)
      .then((res) => res.json())
      .then(({ data }) => {
        setUsers(data);
      })
      .then(() => setUsersLoading(false));
  }, [token]);

  useEffect(() => {
    getOrders(token)
      .then((res) => res.json())
      .then(({ data }) => {
        setOrders(data);
      })
      .then(() => setOrdersLoading(false));
  }, [token]);

  return (
    <div>
      <Title level={2}>Full system dashboard</Title>
      <Row gutter={[16, 16]}>
        {/* products info */}
        <Col>
          <Card style={{ width: 300 }} loading={productsLoading}>
            <Row gutter={24} align="middle">
              <Col>
                <SkinOutlined
                  style={{
                    fontSize: "30px",
                    marginBottom: "12px",
                    color: "#1890ff",
                  }}
                />
              </Col>
              <Col>
                <Text type="secondary">Total products</Text>
                <br />
                <Title level={3}>{products.productCount}</Title>
              </Col>
            </Row>
          </Card>
        </Col>
        {/* users info */}
        <Col>
          <Card style={{ width: 300 }} loading={usersLoading}>
            <Row gutter={24} align="middle">
              <Col>
                <UserOutlined
                  style={{
                    fontSize: "30px",
                    marginBottom: "12px",
                    color: "#1890ff",
                  }}
                />
              </Col>
              <Col>
                <Text type="secondary">Total users</Text>
                <br />
                <Title level={3}>{users.usersCount}</Title>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <br />
      <Row gutter={[16, 16]}>
        {/* orders info */}
        <Col>
          <Card style={{ width: 300 }} loading={ordersLoading}>
            <Row gutter={24} align="middle">
              <Col>
                <ShoppingCartOutlined
                  style={{
                    fontSize: "30px",
                    marginBottom: "12px",
                    color: "#1890ff",
                  }}
                />
              </Col>
              <Col>
                <Text type="secondary">Total orders</Text>
                <br />
                <Title level={3}>{orders.orderCount}</Title>
              </Col>
            </Row>
          </Card>
        </Col>
        {/* sale info */}
        <Col>
          <Card style={{ width: 300 }} loading={ordersLoading}>
            <Row gutter={24} align="middle">
              <Col>
                <DollarOutlined
                  style={{
                    fontSize: "30px",
                    marginBottom: "12px",
                    color: "#1890ff",
                  }}
                />
              </Col>
              <Col>
                <Text type="secondary">Total orders</Text>
                <br />
                <Title level={3}>{orders.orderCount + " BDT"}</Title>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
