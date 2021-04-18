import React from "react";
import { Modal, Form, Input, message, Select } from "antd";

import { agent } from "../../helpers/agent";
const { Option } = Select;
export default function CreateNewAddressModal({
  visible,
  onCreate,
  onCancel,
  userId,
}) {
  const [form] = Form.useForm();

  return (
    <div>
      <Modal
        visible={visible}
        title="Create new address"
        okText="Create"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          const token = localStorage.getItem("token");

          form
            .validateFields()
            .then((values) => {
              const addressData = {
                ...values,
                user: {
                  id: userId,
                },
              };

              agent
                .createAddress(addressData, token)
                .then((res) => res.json())
                .then((data) => {
                  if (!data.errors) {
                    message.success("New address added successfully");

                    onCreate(values);
                    form.resetFields();
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
        <Form form={form} layout="vertical" name="form_in_modal">
          {/* division */}
          <Form.Item
            name="division"
            label="Division&nbsp;:"
            rules={[
              {
                required: true,
                message: "Please choose a division!",
              },
            ]}
          >
            <Select defaultValue="Choose division..." allowClear>
              <Option value="barisal">Barisal</Option>
              <Option value="chittagong">Chittagong</Option>
              <Option value="dhaka">Dhaka</Option>
              <Option value="khulna">Khulna</Option>
              <Option value="mymenshingh">Mymenshingh</Option>
              <Option value="rajshahi">Rajshahi</Option>
              <Option value="rangpur">Rangpur</Option>
              <Option value="sylhet">Sylhet</Option>
            </Select>
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
