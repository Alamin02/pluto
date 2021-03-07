import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Upload, Cascader } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};

export default function ProductForm({ visible, onCreate, onCancel }) {
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
        // console.log(data);
        setCategoryOptions(data);
      });
  }, []);

  const [form] = Form.useForm();

  const normFile = (e) => {
    console.log("Upload event:", e);

    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  function onChangeCategory(value) {
    console.log(value);
  }

  return (
    <div>
      <Modal
        visible={visible}
        title="Add User"
        okText="Create"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onCreate(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form
          {...layout}
          name="basic"
          // form loads initial values from here
          initialValues={{
            productName: "Shirt",
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Product Name"
            name="productName"
            rules={[
              {
                required: true,
                message: "Please input product name",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: "Please input product price",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input product description",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            label="Category"
            name="category"
            rules={[
              {
                required: true,
                message: "Please input product category",
              },
            ]}
          >
            {/* <Input /> */}
            <Cascader
              fieldNames={{
                label: "name",
                value: "name",
                children: "children",
              }}
              options={categoryOptions}
              onChange={onChangeCategory}
              placeholder="Please choose category"
            />
          </Form.Item>

          <Form.Item label="Offer" name="offer">
            <Input />
          </Form.Item>

          <Form.Item label="Dragger">
            <Form.Item
              name="dragger"
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
              <Upload.Dragger name="files" action="/upload.do">
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
