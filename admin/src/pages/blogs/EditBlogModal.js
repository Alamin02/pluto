import React from "react";
import { Modal, Form, Input, message } from "antd";

import { agent } from "../../helpers/agent";

export default function EditBlogModal({
  visible,
  onCreate,
  onCancel,
  existingRecord,
}) {
  const [form] = Form.useForm();

  return (
    <div>
      <Modal
        visible={visible}
        title="Edit blog"
        okText="Save"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          const token = localStorage.getItem("token");
          form
            .validateFields()
            .then((values) => {
              agent
                .editBlog(values, token, existingRecord.id)
                .then((res) => res.json())
                .then(() => message.info("blog updated"));

              form.resetFields();
              onCreate(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form form={form} layout="vertical" initialValues={existingRecord}>
          {/* blog title */}
          <Form.Item
            name="title"
            label="Blog Title&nbsp;:"
            rules={[
              {
                required: true,
                message: "Please enter blog title!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* author */}
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
            <Input />
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
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
