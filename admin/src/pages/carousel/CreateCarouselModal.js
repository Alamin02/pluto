import React, { useState } from "react";
import { Modal, Form, Input, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";

import { agent } from "../../helpers/agent";

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

  const handleUpload = async (info) => {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const getImageFromDragger = (event) => {
    console.log("Upload event:", event);
    return event && event.file;
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
              // formData.append("carouselImage", carouselImage);
              formData.forEach((file) => console.log("File: ", file));

              agent
                .createCarousel(formData, token)
                .then((res) => res.json())
                .then(() => {
                  form.resetFields();
                  onCreate(values);
                });
            })

            .catch(({ errors }) => {
              console.log("Validate Failed:", errors);
            });
        }}
      >
        <Form
          {...layout}
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
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

          {/* <Form.Item label="Dragger">
            <Form.Item
              name="carouselImage"
              valuePropName="file"
              getValueFromEvent={getImageFromDragger}
              noStyle
              rules={[
                {
                  required: false,
                  message: "Please input carousel photo",
                },
              ]}
            >
              <Upload.Dragger
                onChange={handleUpload}
                beforeUpload={(file, fileList) => {
                  setCarouselImage(file);
                  return false;
                }}
                accept="image/*"
                multiple={true}
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
          </Form.Item> */}
        </Form>
      </Modal>
    </div>
  );
}
