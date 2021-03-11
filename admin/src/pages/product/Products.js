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
import { Columns } from "./ProductTableColumn"
import ProductForm from "./ProductForm";
import EditProductModal from "./EditProductModal";

const { Title } = Typography;
const deleteMessage = "Sure to delete?";

// delete button message
function confirmDelete() {
  message.info("Clicked on Yes.");
}

export default function Products() {
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState(0);
  const [visibleEditproduct, setvisibleEditproduct] = useState(false);
  const [selectedproduct, setselectedproduct] = useState(null);

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
        console.log(data.products);
      });
  };

  const onCreate = (values) => {
    fetchProducts();
    setVisible(false);
  };

  const onEditProduct = () => {
    setvisibleEditproduct(false);
  };

  const onEdit = (record) => {
    setselectedproduct(record);
    setvisibleEditproduct(true);
    console.log(record)
  };

  const [productData, setProductData] = useState([]);


  useEffect(() => {
    fetchProducts();
  }, []);
  const actionColumn = {
    title: "Action",
    key: "action",
    fixed: "right",
    render: (id, record) => (
      <Space size="middle">
        <Button
          icon={<EditOutlined />}
          onClick={() => {
            // setVisible(true);
            // setId(id);
            // console.log("ide", id);
            onEdit(record);
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
  }
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

        {/* edit product */}
        <EditProductModal
          visible={visibleEditproduct}
          onCreate={onEditProduct}
          existingRecord={selectedproduct}
          onCancel={() => {
            setvisibleEditproduct(false);
          }}
        />
        {/* table */}
        <Table
          rowKey={(record) => record.id}
          size="middle"
          dataSource={productData}
          columns={[...Columns, actionColumn]}
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
