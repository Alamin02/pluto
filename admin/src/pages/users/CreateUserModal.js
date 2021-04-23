import React from "react";
import { Modal, Form, Input, message, Select } from "antd";

import { agent } from "../../helpers/agent";
const { Option } = Select;
export default function CreateUserModal({ visible, onCreate, onCancel }) {
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
          const token = localStorage.getItem("token");

          form
            .validateFields()
            .then((values) => {
              agent
                .createUser(values, token)
                .then((res) => res.json())
                .then((data) => {
                  if (!data.errors) {
                    message.success("New user added successfully");

                    form.resetFields();
                    onCreate(values);
                  } else {
                    for (let error of data.errors) {
                      message.error(error.msg);
                    }
                  }
                });

              form.resetFields();
              onCreate(values);
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
