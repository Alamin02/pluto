import React, { useState } from "react";
import { Modal, Form, Input, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";

import { createFeaturedProduct } from "../../client/featuredProducts.client";

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};

export default function CreateFeaturedProductModal({
  visible,
  onCreate,
  onCancel,
}) {
  const [form] = Form.useForm();

  const [featuredProductImage, setFeaturedImage] = useState(null);

  const getImageFromDragger = (event) => {
    return event && event.file;
  };

  return (
    <Modal
      visible={visible}
      title="Add Carousel"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        const token = localStorage.getItem("token");

        form
          .validateFields()
          .then((values) => {
            const formData = new FormData();

            formData.append("title", values.title);
            formData.append("productId", values.productId);
            formData.append("featuredProductImage", featuredProductImage);

            createFeaturedProduct(formData, token)
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

          .catch(({ errors }) => {
            console.log("Validate Failed:", errors);
          });
      }}
    >
      <Form {...layout} form={form}>
        <Form.Item
          label="Product Id"
          name="productId"
          rules={[
            {
              required: true,
              message:
                "Please input the id of the product that you want to feature",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message:
                "Please input the title of the product that you want to feature",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Dragger">
          <Form.Item
            name="carouselImage"
            valuePropName="file"
            getValueFromEvent={getImageFromDragger}
            noStyle
            rules={[
              {
                required: true,
                message: "Please input featured product photo",
              },
            ]}
          >
            <Upload.Dragger
              beforeUpload={(file, fileList) => {
                setFeaturedImage(file);
                return false;
              }}
              accept="image/*"
              multiple={false}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload.
              </p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
      </Form>
    </Modal>
  );
}