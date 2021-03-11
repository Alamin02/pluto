import React, { useState, useEffect } from "react";
import {
  Table,
  Tag,
  Space,
  Button,
  Popconfirm,
  message,
  Typography,
  Row,
  Col,
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

import ProductForm from "./ProductForm";

const { Title } = Typography;
const deleteMessage = "Sure to delete?";

// delete button message
function confirmDelete() {
  message.info("Clicked on Yes.");
}

export default function Products() {
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState(0);

  const fetchProducts = () => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:4000/api/v1/products", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(({ data }) => {
        setProductData(data.products);
      });
  };

  const onCreate = (values) => {
    fetchProducts();
    setVisible(false);
  };

  const [productData, setProductData] = useState([]);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      render: (id) => <span>{id}</span>,
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Offer",
      dataIndex: "offer",
      key: "offer",
      render: (offer) => {
        if (offer) {
          return <Tag color="green">{offer.name}</Tag>;
        }
      },
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => {
        if (category) {
          return <Tag color="volcano">{category.name}</Tag>;
        }
      },
    },
    {
      title: "Summary",
      dataIndex: "summary",
      key: "summary",
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      render: (id, record) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setVisible(true);
              setId(id);
              console.log("id", id);
            }}
          >
            Edit
          </Button>
          <Popconfirm
            placement="top"
            title={deleteMessage}
            onConfirm={confirmDelete}
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <Space direction="vertical" size="middle">
        {/* add product button */}
        <Button
          type="primary"
          style={{ textTransform: "capitalize" }}
          icon={<PlusOutlined />}
          onClick={() => {
            setVisible(true);
          }}
        >
          add product
        </Button>

        <ProductForm
          productId={id}
          visible={visible}
          onCreate={onCreate}
          onCancel={() => {
            setVisible(false);
          }}
        />

        {/* table */}
        <Table
          rowKey={(record) => record.id}
          size="middle"
          dataSource={productData}
          columns={columns}
          bordered
          sticky
          scroll={{ y: 1330 }}
          pagination={{ pageSize: 10 }}
          title={() => (
            <Row justify="space-between">
              <Col>
                <Title
                  level={4}
                  style={{ marginBottom: 0, textTransform: "capitalize" }}
                >
                  All products info
                </Title>
              </Col>
              <Col></Col>
            </Row>
          )}
          footer={() => (
            <div>
              <p>Total products: XX</p>
            </div>
          )}
        />
      </Space>
    </div>
  );
}
