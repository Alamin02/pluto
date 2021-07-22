import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, message } from "antd";

import { getCategories, createCategory } from "../../client/category.client";

const { Option } = Select;

export default function CreateCategoryModal({
  visible,
  onCreate,
  onCancel,
  categoryData,
}) {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  return (
    <div>
      <Modal
        visible={visible}
        title="Add Category"
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
              createCategory(values, token)
                .then((res) => res.json())
                .then(({ success, message: msg, error }) => {
                  setConfirmLoading(false);
                  if (success) {
                    form.resetFields();
                    onCreate(values);
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
        <Form form={form} layout="vertical" name="form_in_modal">
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

          <Form.Item name="parentId" label="Parent&nbsp;:">
            <Select defaultValue="null">
              {categoryData &&
                categoryData.map((category) => (
                  <Option value={category.id} id={category.id}>
                    {category.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
