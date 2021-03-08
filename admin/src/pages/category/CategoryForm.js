import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select } from "antd";

import { agent } from "../../helpers/agent";

const { Option } = Select;

export default function CategoryForm({ visible, onCreate, onCancel }) {
  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:4000/api/v1/category", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(({ data }) => {
        setCategoryOptions(data);
      });
  }, []);

  const [form] = Form.useForm();

  return (
    <div>
      <Modal
        visible={visible}
        title="Add Category"
        okText="Create"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              agent.createCategory(values).then((res) => res.json());
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
          // initialValues={{}}
        >
          <Form.Item
            name="name"
            label="Category name&nbsp;:"
            rules={[
              {
                required: true,
                message: "Please enter category/ sub category!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="parentId" label="Parent&nbsp;:">
            <Select defaultValue="null">
              {categoryOptions.map((category) => (
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
