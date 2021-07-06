import React, { useEffect } from "react";
import { Modal, Form, Input, message } from "antd";

import { editCategory } from "../../client/category.client";

export default function EditCategoryModal({
  visible,
  onCreate,
  onCancel,
  currentCategory,
}) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
  }, [currentCategory, form]);

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
              editCategory(values, token, currentCategory.id)
                .then((res) => res.json())
                .then(({ success, message: msg, error }) => {
                  if (success) {
                    message.success(msg);
                    form.resetFields();
                    onCreate(values);
                  } else {
                    message.error(error);
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
