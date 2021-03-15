import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Cascader } from "antd";

import { agent } from "../../helpers/agent";

export default function EditProductModal({
  visible,
  onCreate,
  onCancel,
  existingRecord,
}) {
  const [form] = Form.useForm();
  const [categoryOptions, setCategoryOptions] = useState(null);

  // function onChangeCategory(value) {
  //   form.setFieldsValue("categoryId", value[0]);
  // }

  useEffect(() => {
    form.resetFields();
    if (existingRecord) {
      const numberOfImages = existingRecord.images.length;
      console.log(numberOfImages)
      agent.
        getSingleCategory(existingRecord.category.id)
        .then((res) => res.json())
        .then((data) => console.log(data));

      for (let i = 0; i < numberOfImages; i++) {
        agent.
          getProductImage(existingRecord.images[i].id)
          .then((res) => res.json())
          .then((data) => console.log(data));
      }
    }
  }, [existingRecord]);

  return (
    <div>
      <Modal
        visible={visible}
        title="Edit Product"
        okText="Save"
        forceRender={true}
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          const token = localStorage.getItem("token");
          form
            .validateFields()
            .then((values) => {
              agent
                .editProduct(values, token, existingRecord.id)
                .then((res) => res.json())
              // .then(console.log);

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
          initialValues={existingRecord}
          preserve={false}
        >
          {/* offer name */}
          <Form.Item
            name="name"
            label="Product Name&nbsp;:"
            rules={[
              {
                required: true,
                message: "Please enter product name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price&nbsp;:"
            rules={[
              {
                required: true,
                message: "Please enter product price!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="summary"
            label="Summary&nbsp;:"
            rules={[
              {
                required: true,
                message: "Please enter summary!",
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
                message: "Please input product description!",
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
              defaultValue={['zhejiang', 'hangzhou', 'xihu']}
              options={categoryOptions}
              // onChange={onChangeCategory}
              placeholder="Please choose category"
            />
          </Form.Item>

          <Form.Item label="Offer" name="offer">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
