import React, { useEffect, useState } from "react";
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
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { agent } from "../../helpers/agent";
const { Title } = Typography;
const deleteMessage = "Sure to delete?";

// delete button message
function confirmDelete() {
  message.info("Clicked on Yes.");
}

export default function Products() {
  const [BlogData, setBlogData] = useState([]);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      render: (id) => <span>{id}</span>,
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      render: (id, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />}>Edit</Button>
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
    agent.getBlogs().then((data) => {
      console.log(data);
      setBlogData(data);
    });
  }, []);

  return (
    <div>
      <Space direction="vertical" size="middle">
        {/* table */}
        <Table
          rowKey={(record) => record.id}
          size="middle"
          dataSource={BlogData}
          columns={columns}
          bordered
          sticky
          pagination={false}
          title={() => (
            <Row justify="space-between">
              <Col>
                <Title
                  level={4}
                  style={{ marginBottom: 0, textTransform: "capitalize" }}
                >
                  All Blogs
                </Title>
              </Col>
              <Col></Col>
            </Row>
          )}
        />
      </Space>
    </div>
  );
}
