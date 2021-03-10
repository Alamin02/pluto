import React from "react";
import { Modal, Form, Input, message } from "antd";

import { agent } from "../../helpers/agent";

export default function CreateOfferModal({ visible, onCreate, onCancel }) {
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
          form
            .validateFields()
            .then((values) => {
              agent
                .createOffer(values, token)
                .then((res) => res.json())
                .then((data) => {
                  if (!data.errors) {
                    form.resetFields();
                    onCreate(data);
                    message.success(data.msg);
                  } else {
                    for (let error of data.errors) {
                      message.error(error.msg);
                    }
                  }
                });
            })
            .catch((info) => {
              console.log("Validate Failed");
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            modifier: "public",
          }}
        >
          {/* offer name */}
          <Form.Item
            name="name"
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
