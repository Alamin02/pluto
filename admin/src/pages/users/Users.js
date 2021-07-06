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

import { getUsers, deleteUser } from "../../client/users.client";
import { columns } from "./userTableColumns";
import CreateUserModal from "./CreateUserModal";
import EditUserModal from "./EditUserModal";

const { Title } = Typography;

const Users = () => {
  const [visibleCreateModal, setVisibleCreateModal] = useState(false);
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [userData, setUserData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const token = localStorage.getItem("token");

  function fetchUsers() {
    getUsers(token)
      .then((res) => res.json())
      .then(({ data }) => {
        setUserData(data);
      });
  }

  function onCreateUser() {
    fetchUsers();
    setVisibleCreateModal(false);
  }

  function onEditUser() {
    fetchUsers();
    setVisibleEditModal(false);
  }

  function onEdit(record) {
    setVisibleEditModal(true);
    setSelectedUser(record);
  }

  function handleDelete(userId) {
    deleteUser(token, userId)
      .then((res) => res.json())
      .then(({ success, message: msg, error }) => {
        if (success) {
          message.success(msg);
          fetchUsers();
        } else {
          message.error(error);
        }
      });
  }

  useEffect(() => {
    fetchUsers();
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
          add user
        </Button>

        <CreateUserModal
          visible={visibleCreateModal}
          onCreate={onCreateUser}
          onCancel={() => {
            setVisibleCreateModal(false);
          }}
        />

        <EditUserModal
          visible={visibleEditModal}
          onCreate={onEditUser}
          currentUser={selectedUser}
          onCancel={() => {
            setVisibleEditModal(false);
          }}
        />

        <Table
          rowKey={(record) => record.id}
          dataSource={userData}
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
