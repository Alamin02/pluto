import React, { useState } from "react";
import { Modal, Form, Input, message, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";

import { createBlog } from "../../client/blogs.client";

export default function CreateBlogModal({ visible, onCreate, onCancel }) {
  const [blogImage, setBlogImage] = useState();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [form] = Form.useForm();
  const normFile = (e) => {
    console.log("Upload event:", e);

    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const handleUpload = async (info) => {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  return (
    <div>
      <Modal
        visible={visible}
        title="Add blog"
        okText="Create"
        cancelText="Cancel"
        confirmLoading={confirmLoading}
        onCancel={onCancel}
        onOk={() => {
          setConfirmLoading(true);

          const token = localStorage.getItem("token");

          form
            .validateFields()
            .then((values) => {
              const formData = new FormData();

              formData.append("title", values.title);
              formData.append("author", values.author);
              formData.append("description", values.description);
              formData.append("blogImage", blogImage);

              createBlog(formData, token)
                .then((res) => res.json())
                .then(({ success, message: msg, error }) => {
                  setConfirmLoading(false);
                  if (success) {
                    form.resetFields();
                    onCreate();
                    message.success(msg, 3);
                  } else {
                    message.error(error, 5);
                  }
                });
            })
            .catch((info) => {
              setConfirmLoading(false);
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            modifier: "public",
          }}
        >
          {/* blog  title */}
          <Form.Item
            name="title"
            label="Blog title&nbsp;:"
            rules={[
              {
                required: true,
                message: "Please enter blog title!",
              },
            ]}
          >
            <Input placeholder="enter blog title" />
          </Form.Item>

          {/* discount */}
          <Form.Item
            name="author"
            label="Author&nbsp;:"
            rules={[
              {
                required: true,
                message: "Please enter author name!",
              },
            ]}
          >
            <Input placeholder="enter author name" />
          </Form.Item>

          {/* description */}
          <Form.Item
            name="description"
            label="Description&nbsp;:"
            rules={[
              {
                required: true,
                message: "Please enter description!",
              },
            ]}
          >
            <Input.TextArea placeholder="enter description" />
          </Form.Item>
          <Form.Item label="BlogImage">
            <Form.Item
              name="blogImage"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              noStyle
              rules={[
                {
                  required: true,
                  message: "Please input blogImage",
                },
              ]}
            >
              <Upload.Dragger
                name="files"
                onChange={handleUpload}
                beforeUpload={(file, fileList) => {
                  setBlogImage(file);
                  return false;
                }}
                accept="image/*"
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload.
                </p>
              </Upload.Dragger>
            </Form.Item>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
