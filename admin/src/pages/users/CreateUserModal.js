import React from "react";
import { Modal, Form, Input, message, Select } from "antd";

import { createUser } from "../../client/users.client";
const { Option } = Select;
export default function CreateCategoryModal({ visible, onCreate, onCancel }) {
  const [form] = Form.useForm();

  const [confirmLoading, setConfirmLoading] = React.useState(false);

  return (
    <div>
      <Modal
        visible={visible}
        title="Add User"
        okText="Create"
        cancelText="Cancel"
        confirmLoading={confirmLoading}
        onCancel={onCancel}
        onOk={() => {
          const token = localStorage.getItem("token");

          form
            .validateFields()
            .then((values) => {
              createUser(values, token)
                .then((res) => res.json())
                .then(({ success, message: msg, error }) => {
                  if (success) {
                    form.resetFields();
                    onCreate(values);
                    setConfirmLoading(false);

                    message.success(msg, 3);
                  } else {
                    setConfirmLoading(false);

                    message.error(error, 5);
                  }
                });
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form form={form} layout="vertical" name="form_in_modal">
          {/* role */}
          <Form.Item name="role" label="Role&nbsp;:">
            <Select defaultValue="choose a role...">
              <Option value="user">user</Option>
              <Option value="admin">admin</Option>
            </Select>
          </Form.Item>

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
