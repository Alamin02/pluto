import React from "react";
import { Modal, Form, Input, message } from "antd";

import { agent } from "../../helpers/agent";

export default function CreateBlogModal({ visible, onCreate, onCancel }) {
  const [form] = Form.useForm();

  return (
    <div>
      <Modal
        visible={visible}
        title="Add blog"
        okText="Create"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          const token = localStorage.getItem("token");
          form
            .validateFields()
            .then((values) => {
              agent
                .createBlog(values, token)
                .then((res) => res.json())
                .then((data) => {
                  if (!data.errors) {
                    form.resetFields();
                    console.log("createBlog", data);
                    onCreate(data);
                    message.success(data.msg);
                  } else {
                    for (let error of data.errors) {
                      message.error(error.msg);
                    }
                  }
                });
            })
            .catch((info) => {
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
        </Form>
      </Modal>
    </div>
  );
}
