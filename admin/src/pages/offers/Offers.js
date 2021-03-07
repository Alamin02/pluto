import React from "react";
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

const { Title } = Typography;
const deleteMessage = "Sure to delete?";

// delete button message
function confirmDelete() {
  message.info("Clicked on Yes.");
}

const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    render: (id) => <span>{id}</span>,
  },
  {
    title: "offer Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Discount",
    dataIndex: "discount",
    key: "discount",
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

export default function Offers() {
  return (
    <div>
      <Space direction="vertical" size="middle">
        {/* table */}
        <Table
          rowKey={(record) => record.id}
          size="middle"
          // dataSource={dataSource}
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
                  All offers info
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
