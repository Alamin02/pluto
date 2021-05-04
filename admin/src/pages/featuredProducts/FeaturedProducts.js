import React, { useState, useEffect } from "react";
import {
  Table,
  Space,
  Button,
  Popconfirm,
  message,
  Row,
  Col,
  Typography,
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

import { agent } from "../../helpers/agent";
import { columns } from "./featuredProductTableColumns";
import CreateFeaturedProductModal from "./CreateFeaturedProductModal";
import EditFeaturedProductModal from "./EditFeaturedProductModal";

const { Title } = Typography;

const FeaturedProducts = () => {
  const [visibleCreateModal, setVisibleCreateModal] = useState(false);
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [featuredProductData, setFeaturedProductData] = useState([]);
  const [selectedFeaturedProduct, setSelectedFeaturedProduct] = useState(null);

  const token = localStorage.getItem("token");

  function fetchFeaturedProducts() {
    agent
      .getFeaturedProducts()
      .then((res) => res.json())
      .then(({ data }) => {
        setFeaturedProductData(data.featuredProducts);
        if (selectedFeaturedProduct)
          setSelectedFeaturedProduct(
            data.featuredProducts.find((featuredProduct) => featuredProduct.id === selectedFeaturedProduct.id)
          );
      });
  }

  function onCreateFeaturedProduct() {
    fetchFeaturedProducts();
    setVisibleCreateModal(false);
  }

  function onEditFeaturedProduct() {
    fetchFeaturedProducts();
    setVisibleEditModal(false);
  }

  function onEdit(record) {
    setVisibleEditModal(true);
    setSelectedFeaturedProduct(record);
    console.log(record)
  }

  function handleDelete(record) {

    agent
      .deleteFeaturedProduct(token, record.id, record.product.id)
      .then((res) => res.json())
      .then(() => fetchFeaturedProducts())
      .then(() => message.info("Deleted successfully"));
  }

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const actionColumn = {
    title: "Action",
    key: "action",
    render: (id, record) => (
      <Space size="middle">
        <Button
          icon={<EditOutlined />}
          onClick={() => {
            onEdit(record);
          }}
        >
          Edit
        </Button>
        <Popconfirm
          placement="top"
          title="Sure to delete?"
          onConfirm={() => handleDelete(record)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger icon={<DeleteOutlined />}>
            Delete
          </Button>
        </Popconfirm>
      </Space>
    )
  };

  return (
    <div>
      <Space direction="vertical" size="middle">
        {(featuredProductData && featuredProductData.length === 4) ? (
          <></>
        ) : (
          <Button
            type="primary"
            style={{ textTransform: "capitalize" }}
            icon={<PlusOutlined />}
            onClick={() => {
              setVisibleCreateModal(true);
            }}
          >
            add featured Product
          </Button>
        )}

        <CreateFeaturedProductModal
          visible={visibleCreateModal}
          onCreate={onCreateFeaturedProduct}
          onCancel={() => {
            setVisibleCreateModal(false);
          }}
        />

        <EditFeaturedProductModal
          visible={visibleEditModal}
          onCreate={onEditFeaturedProduct}
          existingRecord={selectedFeaturedProduct}
          onCancel={() => {
            setVisibleEditModal(false);
          }}
          refetch={fetchFeaturedProducts}
        />

        <Table
          rowKey={(record) => record.id}
          dataSource={featuredProductData}
          size="middle"
          columns={[...columns, actionColumn]}
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
                  All featured products info
                </Title>
              </Col>
            </Row>
          )}
        />
      </Space>
    </div>
  );
};

export default FeaturedProducts;
