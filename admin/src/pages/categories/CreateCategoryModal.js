import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, message } from "antd";

import { getCategories, createCategory } from "../../client/category.client";

const { Option } = Select;

export default function CreateCategoryModal({ visible, onCreate, onCancel }) {
  const [form] = Form.useForm();

  const [categoryOptions, setCategoryOptions] = useState([]);

  function fetchCategories() {
    getCategories()
      .then((res) => res.json())
      .then(({ data }) => {
        setCategoryOptions(data);
      });
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <Modal
        visible={visible}
        title="Add Category"
        okText="Create"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          const token = localStorage.getItem("token");

          form
            .validateFields()
            .then((values) => {
              createCategory(values, token)
                .then((res) => res.json())
                .then((res) => {
                  const { success, error } = res;

                  if (success) {
                    form.resetFields();
                    onCreate(values);
                    message.success(res.message);
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
              {categoryOptions &&
                categoryOptions.map((category) => (
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
