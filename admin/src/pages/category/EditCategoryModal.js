import React, { useEffect } from "react";
import { Modal, Form, Input, message } from "antd";

import { agent } from "../../helpers/agent";

export default function EditCategoryModal({
  visible,
  onCreate,
  onCancel,
  currentCategory,
}) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
  }, [currentCategory]);

  return (
    <div>
      <Modal
        visible={visible}
        title="Edit Category"
        okText="Save"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          const token = localStorage.getItem("token");

          form
            .validateFields()
            .then((values) => {
              agent
                .editCategory(values, token, currentCategory.id)
                .then((res) => res.json())
                .then(() => message.success("Category updated successfully"));

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
          initialValues={currentCategory}
        >
          <Form.Item
            name="name"
            label="Category name&nbsp;:"
            rules={[
              {
                required: true,
                message: "Please enter category name!",
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
