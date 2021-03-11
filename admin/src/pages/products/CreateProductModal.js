import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Upload, Cascader, message } from "antd";
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

export default function ProductForm({
  productId,
  visible,
  onCreate,
  onCancel,
}) {
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [productImages, setproductImages] = useState([]);

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
    form.setFieldsValue("categoryId", value[0]);
  }

  const handleUpload = async (info) => {
    const files = info.fileList;

    // const imageData = new FormData();
    // imageData.append("file", files[0]);
    // imageData.append("upload_preset", "plutoImages");
    // const res = await fetch(
    //   "https://api.cloudinary.com/v1_1/rifat32/image/upload",
    //   {
    //     method: "POST",
    //     body: imageData,
    //     config: {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     },
    //   }
    // );
    // console.log(res);

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
        title="Add User"
        okText="Create"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          // console.log(form.getFieldValue("description"));
          const token = localStorage.getItem("token");

          form
            .validateFields()
            .then((values) => {
              console.log(values);

              const formData = new FormData();

              formData.append("name", values.name);
              formData.append("offer", values.offer);
              formData.append("price", values.price);
              formData.append("summary", values.summary);
              formData.append("description", values.description);
              formData.append("categoryId", values.categoryId[1]);

              productImages.forEach((productImage) => {
                formData.append("productImages", productImage);
              });

              console.log([...formData.values()]);

              agent
                .createProduct(formData, token)
                .then((res) => res.json())
                .then(() => {
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
          {...layout}
          form={form}
          // form loads initial values from here
          initialValues={
            {
              // productName: "Shirt",
            }
          }
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

          <Form.Item label="Offer" name="offer">
            <Input />
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
                  setproductImages(fileList);
                  return false;
                }}
                accept="image/*"
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
