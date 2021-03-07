import React from "react";
import { Modal, Form, Input } from "antd";

import { agent } from "../../helpers/agent";

export default function OfferForm({ visible, onCreate, onCancel }) {
  const [form] = Form.useForm();

  return (
    <div>
      <Modal
        visible={visible}
        title="Add offer"
        okText="Create"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          const token = localStorage.getItem("token");
          console.log(token);
          form
            .validateFields()
            .then((values) => {
              agent
                .createOffer(values, token)
                .then((res) => res.json())
                .then(console.log);

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
          name="offer form"
          initialValues={{
            modifier: "public",
          }}
        >
          {/* offer name */}
          <Form.Item
            name="offer name"
            label="Offer Name&nbsp;:"
            rules={[
              {
                required: true,
                message: "Please enter offer name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* discount */}
          <Form.Item
            name="discount"
            label="Discount&nbsp;:"
            rules={[
              {
                required: true,
                message: "Please enter discount!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          {/* description */}
          <Form.Item
            name="description"
            label="Description&nbsp;:"
            rules={[
              {
                required: true,
                message: "Please enter description!",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
