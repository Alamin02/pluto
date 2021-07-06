import React, { useEffect, useState } from "react";
import {
  Table,
  Space,
  Button,
  Popconfirm,
  message,
  Typography,
  Row,
  Col,
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { getBlogs, deleteBlog } from "../../client/blogs.client";
import CreateBlogModal from "./CreateBlogModal";
import EditBlogModal from "./EditBlogModal";
import { Columns } from "./BlogTableColumns";
const { Title } = Typography;
const deleteMessage = "Sure to delete?";

export default function Blogs() {
  const [visible, setVisible] = useState(false);
  const [BlogData, setBlogData] = useState([]);
  const [blogToEditVisible, setBlogToEditVisible] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const fetchBlogs = () => {
    getBlogs().then((data) => {
      setBlogData(data);
    });
  };

  // close createBlogModal
  const handleCreateBlogModal = () => {
    setVisible(false);
    fetchBlogs();
  };

  // close EditBlogModal
  const handleEditBlogModal = () => {
    setBlogToEditVisible(false);
    fetchBlogs();
    // window.location.reload();
  };

  // get all blogs
  useEffect(() => {
    fetchBlogs();
  }, []);

  // edit blog
  const handleEdit = (record) => {
    setSelectedBlog(record);
    setBlogToEditVisible(true);
  };
  // delete blog
  function handleDelete(blogId) {
    const token = localStorage.getItem("token");

    deleteBlog(token, blogId)
      .then((res) => res.json())
      .then(({ success, message: msg, error }) => {
        if (success) {
          message.success(msg);
        } else {
          message.error(error);
        }
      })
      .then(() => fetchBlogs());
  }
  const actionColumn = {
    title: "Action",
    key: "action",
    fixed: "right",
    render: (id, record) => (
      <Space size="middle">
        <Button
          icon={<EditOutlined />}
          onClick={() => {
            handleEdit(record);
          }}
        >
          Edit
        </Button>
        <Popconfirm
          placement="top"
          title={deleteMessage}
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
            setVisible(true);
          }}
        >
          Add Blog
        </Button>
        <CreateBlogModal
          visible={visible}
          onCreate={handleCreateBlogModal}
          onCancel={() => {
            setVisible(false);
          }}
        />

        <EditBlogModal
          visible={blogToEditVisible}
          onCreate={handleEditBlogModal}
          existingRecord={selectedBlog}
          onCancel={() => {
            setBlogToEditVisible(false);
          }}
          refetch={fetchBlogs}
        />
        {/* table */}
        <Table
          rowKey={(record) => record.id}
          size="middle"
          dataSource={BlogData}
          columns={[...Columns, actionColumn]}
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
