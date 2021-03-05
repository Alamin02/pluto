import React from "react";
import { Modal, Form, Input } from "antd";

export default function UserForm({ visible, onCreate, onCancel }) {
  const [form] = Form.useForm();

  return (
    <div>
      <Modal
        visible={visible}
        title="Add User"
        okText="Create"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onCreate(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{
            modifier: "public",
          }}
        >
          {/* email */}
          <Form.Item
            name="email"
            label="Email&nbsp;:"
            rules={[
              {
                required: true,
                message: "Please enter user email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* name */}
          <Form.Item
            name="name"
            label="Name&nbsp;:"
            rules={[
              {
                required: true,
                message: "Please enter user name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* phone */}
          <Form.Item
            name="phone"
            label="Phone number&nbsp;:"
            rules={[
              {
                required: true,
                message: "Please enter user phone number!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* password */}
          <Form.Item
            name="password"
            label="Password&nbsp;:"
            rules={[
              {
                required: true,
                message: "Please enter password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
