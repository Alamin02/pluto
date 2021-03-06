import React, { useState, useEffect } from "react";
import { Table, Space, Button, Row, Col, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { getAddresses } from "../../client/address.client";
import { columns } from "./addressTableColumns";

const { Title } = Typography;

export default function Addresses() {
  const token = localStorage.getItem("token");
  const [addressData, setAddressData] = useState([]);

  const fetchOrders = (token) => {
    getAddresses(token)
      .then((res) => res.json())
      .then(({ data }) => {
        setAddressData(data);
        console.log(data);
      });
  };

  useEffect(() => {
    fetchOrders(token);
  }, [token]);

  return (
    <div>
      <Space direction="vertical" size="middle">
        <Button
          disabled
          type="primary"
          style={{ textTransform: "capitalize" }}
          icon={<PlusOutlined />}
        >
          add address
        </Button>

        <Table
          rowKey={(record) => record.id}
          dataSource={addressData}
          size="middle"
          columns={columns}
          bordered
          sticky
          pagination={{
            position: ["bottomCenter"],
            defaultCurrent: 1,
            defaultPageSize: 5,
            pageSizeOptions: [5, 10, 20],
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => {
              return `${range[0]} to ${range[1]} of ${total} offers`;
            },
          }}
          title={() => (
            <Row justify="space-between">
              <Col>
                <Title
                  level={4}
                  style={{ marginBottom: 0, textTransform: "capitalize" }}
                >
                  All addresses info
                </Title>
              </Col>
            </Row>
          )}
        />
      </Space>
    </div>
  );
}
