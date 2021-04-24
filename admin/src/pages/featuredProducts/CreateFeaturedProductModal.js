import React, { useState, useEffect } from "react";
import { Modal, Form, message, Select, Upload, Input } from "antd";
import { InboxOutlined } from "@ant-design/icons"

import { agent } from "../../helpers/agent";
const { Option } = Select;
export default function CreateFeaturedProductModal({ visible, onCreate, onCancel }) {
  const [featuredProductImages, setFeaturedProductImages] = useState([])
  const [form] = Form.useForm();

  const normFile = (e) => {
    console.log("Upload event:", e);

    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };


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

  return (
    <div>
      <Modal
        visible={visible}
        title="Add Featured Product Image"
        okText="Create"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          const token = localStorage.getItem("token");

          form
            .validateFields()
            .then((values) => {
              const formData = new FormData();

              featuredProductImages.forEach((featuredProductImage) => {
                formData.append("featuredProductImages", featuredProductImage);
              });

              agent
                .createFeaturedProduct(formData, token)
                .then((res) => res.json())
                .then(({ data }) => {
                  form.resetFields();
                  onCreate(values);
                });
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
        >
          <Form.Item label="Dragger">
            <Form.Item
              name="featuredProductImages"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              noStyle
              rules={[
                {
                  required: true,
                  message: "Please input product photo",
                },
              ]}
            >
              <Upload.Dragger
                name="files"
                onChange={handleUpload}
                beforeUpload={(file, fileList) => {
                  setFeaturedProductImages(fileList);
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
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
