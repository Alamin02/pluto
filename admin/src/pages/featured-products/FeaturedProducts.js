import { useState, useEffect } from "react";
import { Table, Button, Typography, Space, Popconfirm, message } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

import {
  getFeaturedProducts,
  deleteFeaturedProduct,
} from "../../client/featuredProducts.client";
import { columns } from "././featuredProductColumns";
import CreateFeaturedProductModal from "./CreateFeaturedProductModal";

const { Title, Text } = Typography;

export default function FeaturedProducts() {
  const [visible, setVisible] = useState(false);
  const [featuredProductsData, setFeaturedProductsData] = useState([]);

  const fetchFeaturedProducts = () => {
    getFeaturedProducts()
      .then((res) => res.json())
      .then(({ data }) => setFeaturedProductsData(data));
  };

  useEffect(() => {
    fetchFeaturedProducts();
    setVisible(false);
  }, []);

  const onCreate = () => {
    fetchFeaturedProducts();
    setVisible(false);
  };

  function confirmDelete(productId) {
    const token = localStorage.getItem("token");

    deleteFeaturedProduct(token, productId)
      .then((res) => res.json())
      .then(({ success, message: msg, error }) => {
        if (success) {
          message.success(msg);
        } else {
          message.error(error);
        }
      })
      .then(() => fetchFeaturedProducts());
  }

  const actionColumn = {
    title: "Action",
    key: "action",
    render: (record) => (
      <Popconfirm
        placement="top"
        title={"Sure to delete?"}
        onConfirm={() => confirmDelete(record.id)}
        okText="Yes"
        cancelText="No"
      >
        <Button danger icon={<DeleteOutlined />}>
          Delete
        </Button>
      </Popconfirm>
    ),
  };

  return (
    <Space direction="vertical">
      <Space align="center">
        {featuredProductsData.length < 4 ? (
          <Button
            type="primary"
            style={{ textTransform: "capitalize" }}
            icon={<PlusOutlined />}
            onClick={() => {
              setVisible(true);
            }}
          >
            add featured product
          </Button>
        ) : (
          <Button
            type="primary"
            style={{ textTransform: "capitalize" }}
            icon={<PlusOutlined />}
            disabled
          >
            add featured product
          </Button>
        )}
        <Text type="warning">Maximum of 4 featured products can be added!</Text>
      </Space>

      <CreateFeaturedProductModal
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
      <Table
        rowKey={(record) => record.id}
        dataSource={featuredProductsData}
        columns={[...columns, actionColumn]}
        bordered
        pagination={false}
        title={() => (
          <Title
            level={4}
            style={{ marginBottom: 0, textTransform: "capitalize" }}
          >
            Featured products info
          </Title>
        )}
      />
    </Space>
  );
}
