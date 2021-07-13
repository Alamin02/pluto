import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Upload, Cascader, message, Select } from "antd";
import { InboxOutlined } from "@ant-design/icons";

import { createProduct } from "../../client/products.client";
import { getOffers } from "../../client/offers.client";
import { getCategories } from "../../client/category.client";

const { Option } = Select;

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
  const [productImages, setProductImages] = useState([]);
  const [offerOptions, setOfferOptions] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    getCategories()
      .then((res) => res.json())
      .then(({ data }) => {
        setCategoryOptions(data);
      });

    getOffers()
      .then((res) => res.json())
      .then(({ data }) => {
        setOfferOptions(data.offers);
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
    form.setFieldsValue("categoryId", value[0]);
  }

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
        form={form}
        visible={visible}
        title="Add User"
        okText="Create"
        cancelText="Cancel"
        confirmLoading={confirmLoading}
        onCancel={onCancel}
        onOk={() => {
          setConfirmLoading(true);

          const token = localStorage.getItem("token");

          form
            .validateFields()
            .then((values) => {
              const formData = new FormData();

              formData.append("name", values.name);
              formData.append("offerId", values.offer);
              formData.append("price", values.price);
              formData.append("summary", values.summary);
              formData.append("description", values.description);

              let categoryArray = values.categoryId;

              if (categoryArray.length === 2) {
                formData.append("categoryId", values.categoryId[1]);
              } else {
                formData.append("categoryId", values.categoryId[0]);
              }

              productImages.forEach((productImage) => {
                formData.append("productImages", productImage);
              });

              createProduct(formData, token)
                .then((res) => res.json())
                .then(({ success, message: msg, error }) => {
                  setConfirmLoading(false);
                  if (success) {
                    form.resetFields();
                    onCreate(values);
                    message.success(msg, 3);
                  } else {
                    message.error(error, 5);
                  }
                });
            })

            .catch((info) => {
              setConfirmLoading(false);
              console.log("Validate Failed:", info);
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
            label="Product Name"
            name="name"
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
            label="Summary"
            name="summary"
            rules={[
              {
                required: true,
                message: "Please input product sumamry",
              },
            ]}
          >
            <Input.TextArea />
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
            rules={[
              {
                required: true,
                message: "Please input product category",
              },
            ]}
            name="categoryId"
          >
            {/* <Input /> */}
            <Cascader
              name="category"
              fieldNames={{
                label: "name",
                value: "id",
                children: "children",
              }}
              options={categoryOptions}
              onChange={onChangeCategory}
              placeholder="Please choose category"
            />
          </Form.Item>

          <Form.Item name="offer" label="New offer&nbsp;:">
            <Select defaultValue="null">
              {offerOptions &&
                offerOptions.map((offer) => (
                  <Option value={offer.id} id={offer.id}>
                    {offer.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item label="Dragger">
            <Form.Item
              name="productImages"
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
                  setProductImages(fileList);
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
