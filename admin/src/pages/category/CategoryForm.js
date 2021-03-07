import React from "react";
import { Modal, Form, Input } from "antd";

import { agent } from "../../helpers/agent";

export default function CategoryForm({ visible, onCreate, onCancel }) {
  const [form] = Form.useForm();

  return (
    <div>
      <Modal
        visible={visible}
        title="Add Category"
        okText="Create"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {}}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{
            modifier: "public",
          }}
        >
          <Form.Item
            name="category"
            label="Category&nbsp;:"
            rules={[
              {
                required: true,
                message: "Please enter user email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="subCategory" label="Sub Category&nbsp;:">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
