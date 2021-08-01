import React, { useEffect } from "react";
import { Modal, Form, Input, message } from "antd";

import { updateAddress } from "../../client/address.client";

export default function EditAddressModal({
  visible,
  onCreate,
  onCancel,
  currentAddress,
}) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
  }, [currentAddress, form]);

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
              updateAddress(values, token, currentAddress.id)
                .then((res) => res.json())
                .then((data) => {
                  if (!data.errors) {
                    message.success("Address updated successfully");
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
          initialValues={currentAddress}
        >
          {/* district */}
          <Form.Item
            name="division"
            label="Division&nbsp;:"
            rules={[
              {
                required: true,
                message: "Please enter division name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* district */}
          <Form.Item
            name="district"
            label="District&nbsp;:"
            rules={[
              {
                required: true,
                message: "Please enter district name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* city */}
          <Form.Item
            name="city"
            label="City&nbsp;:"
            rules={[
              {
                required: true,
                message: "Please enter city name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* address */}
          <Form.Item
            name="address"
            label="Full address&nbsp;:"
            rules={[
              {
                required: true,
                message: "Please enter full address!",
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
