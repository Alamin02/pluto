import React, { useEffect } from "react";
import { Modal, Form, Input, message } from "antd";

import { agent } from "../../helpers/agent";

export default function EditCategoryModal({
  visible,
  onCreate,
  onCancel,
  currentUser,
}) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
  }, [currentUser]);

  return (
    <div>
      <Modal
        visible={visible}
        title="Edit User"
        okText="Save"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          const token = localStorage.getItem("token");

          form
            .validateFields()
            .then((values) => {
              agent
                .editUser(values, token, currentUser.id)
                .then((res) => res.json())
                .then((data) => {
                  if (!data.errors) {
                    message.success("User updated successfully");
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
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={currentUser}
        >
          {/* role */}
          <Form.Item name="role" label="Role&nbsp;:">
            <Input />
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
        </Form>
      </Modal>
    </div>
  );
}
