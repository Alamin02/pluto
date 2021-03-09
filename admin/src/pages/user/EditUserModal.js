import React from "react";
import { Modal, Form, Input } from "antd";

import { agent } from "../../helpers/agent";

export default function EditCategoryModal({
  visible,
  onCreate,
  onCancel,
  currentUser,
}) {
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
                .editUser(values, token, currentUser.id)
                .then((res) => res.json());

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
          initialValues={currentUser}
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
        </Form>
      </Modal>
    </div>
  );
}
