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
import UserForm from "./UserForm";

const { Title } = Typography;
const deleteMessage = "Sure to delete?";
function confirmDelete() {
  message.info("Clicked on Yes.");
}
const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    ellipsis: true,
    // pass the userId as "id" to edit button
    render: (id) => <span>{id}</span>,
  },
  {
    title: "User Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  // update, delete action
  {
    title: "Action",
    key: "action",
    fixed: "right",
    render: (id, record) => (
      <Space size="middle">
        {/* <Button icon={<EditOutlined />}>Edit&nbsp;{record.id}</Button> */}
        <Button icon={<EditOutlined />}>Edit</Button>
        {/* pop up when clicked on delete button*/}
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

export const Users = () => {
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    setVisible(false);
  };

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:4000/api/v1/users", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(({ data }) => {
        setUserData(data);
      });
  }, []);

  return (
    <div>
      <Space direction="vertical" size="middle">
        {/* add user button */}
        <Button
          type="primary"
          style={{ textTransform: "capitalize" }}
          icon={<PlusOutlined />}
          onClick={() => {
            setVisible(true);
          }}
        >
          add user
        </Button>

        <UserForm
          visible={visible}
          onCreate={onCreate}
          onCancel={() => {
            setVisible(false);
          }}
        />

        <Table
          dataSource={userData}
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
                  All users info
                </Title>
              </Col>
            </Row>
          )}
        />
      </Space>
    </div>
  );
};

export default Users;
