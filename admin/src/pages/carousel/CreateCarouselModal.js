import React, { useState } from "react";
import { Modal, Form, Input, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";

import { createCarousel } from "../../client/carousels.cient";

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};

export default function CreateCarouselModal({ visible, onCreate, onCancel }) {
  const [form] = Form.useForm();

  const [carouselImage, setCarouselImage] = useState(null);

  const getImageFromDragger = (event) => {
    console.log("Upload event:", event);
    return event && event.file;
  };

  return (
    <div>
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
              formData.append("summary", values.summary);
              formData.append("carouselImage", carouselImage);

              createCarousel(formData, token)
                .then((res) => res.json())
                .then((res) => {
                  const { success, error } = res;
                  if (success) {
                    message.success(res.message);
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
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: "Please input carousel title",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Summary"
            name="summary"
            rules={[
              {
                required: true,
                message: "Please input carousel summary",
              },
            ]}
          >
            <Input.TextArea />
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
                  message: "Please input carousel photo",
                },
              ]}
            >
              <Upload.Dragger
                beforeUpload={(file, fileList) => {
                  setCarouselImage(file);
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
    </div>
  );
}
