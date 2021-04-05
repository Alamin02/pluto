import React, { useState, useEffect } from "react";
import { Table, Space, Button, Row, Col, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { agent } from "../../helpers/agent";
import { columns } from "./orderTableColumns";

const { Title } = Typography;

export default function Orders() {
  const [orderData, setOrderData] = useState([]);

  function fetchOrders() {
    agent
      .getOrders()
      .then((res) => res.json())
      .then(({ data }) => {
        setOrderData(data.orders);
      });
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <Space direction="vertical" size="middle">
        <Button
          disabled
          type="primary"
          style={{ textTransform: "capitalize" }}
          icon={<PlusOutlined />}
        >
          add order
        </Button>

        <Table
          rowKey={(record) => record.id}
          dataSource={orderData}
          size="middle"
          columns={columns}
          bordered
          sticky
          pagination={{ pageSize: 10 }}
          title={() => (
            <Row justify="space-between">
              <Col>
                <Title
                  level={4}
                  style={{ marginBottom: 0, textTransform: "capitalize" }}
                >
                  All orders info
                </Title>
              </Col>
            </Row>
          )}
        />
      </Space>
    </div>
  );
}
