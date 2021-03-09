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
import { columns } from "./categoryTableColumns";
import CreateCategoryModal from "./CreateCategoryModal";
import EditCategoryModal from "./EditCategoryModal";

const { Title } = Typography;

export default function Catagories() {
  const [visibleCreateModal, setVisibleCreateModal] = useState(false);
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const token = localStorage.getItem("token");

  function onCreate() {
    setVisibleCreateModal(false);
  }

  function onEdit(record) {
    setVisibleEditModal(true);
    setSelectedCategory(record);
  }

  function handleDelete(categoryId) {
    agent
      .deleteCategory(token, categoryId)
      .then((res) => res.json())
      .then(() => message.info("Successfully deleted"));
  }

  useEffect(() => {
    agent
      .getCategories()
      .then((res) => res.json())
      .then(({ data }) => {
        setCategoryData(data);
      });
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
            onEdit(record);
          }}
        >
          Edit
        </Button>
        <Popconfirm
          placement="top"
          title="Sure to delete?"
          onConfirm={() => handleDelete(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger icon={<DeleteOutlined />}>
            Delete
          </Button>
        </Popconfirm>
      </Space>
    ),
  };

  return (
    <div>
      <Space direction="vertical" size="middle">
        <Button
          type="primary"
          style={{ textTransform: "capitalize" }}
          icon={<PlusOutlined />}
          onClick={() => {
            setVisibleCreateModal(true);
          }}
        >
          add category
        </Button>

        <CreateCategoryModal
          visible={visibleCreateModal}
          onCreate={onCreate}
          onCancel={() => {
            setVisibleCreateModal(false);
          }}
        />

        <EditCategoryModal
          visible={visibleEditModal}
          onCreate={onCreate}
          currentCategory={selectedCategory}
          onCancel={() => {
            setVisibleEditModal(false);
          }}
        />

        <Table
          rowKey={(record) => record.id}
          dataSource={categoryData}
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
                  all categories info
                </Title>
              </Col>
            </Row>
          )}
        />
      </Space>
    </div>
  );
}
