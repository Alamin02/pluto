import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Upload, message, Button, Image } from "antd";
import { CloseCircleOutlined, UploadOutlined } from "@ant-design/icons";

import {
  createFeaturedProduct,
  deleteImage,
} from "../../client/featuredProducts.client";

import DisplayImage from "../../components/DisplayImage";

export default function CreateFeaturedProductModal({
  visible,
  onCreate,
  onCancel,
}) {
  const [form] = Form.useForm();

  const [featuredProductImage, setFeaturedImage] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [uploadList, setUploadList] = useState([]);
  const [uploadButtonStatus, setUploadButtonStatus] = useState(false);

  const token = localStorage.getItem("token");

  const handleUpload = (info) => {
    setUploadList(info.fileList);
    const { status, name, response } = info.file;
    if (status === "done") {
      if (response) {
        setFeaturedImage(response.data);
      }
      message.success(`${name} file uploaded!`);
    } else if (status === "error") {
      message.error(`${name} file upload failed!`);
    }
  };

  const handleImageFromState = (id, originalname) => {
    setUploadList(uploadList.filter((image) => image.name !== originalname));
    setFeaturedImage(null);
  };

  useEffect(() => {
    if (featuredProductImage) {
      setUploadButtonStatus(true);
    } else {
      setUploadButtonStatus(false);
    }
  }, [featuredProductImage]);

  return (
    <Modal
      visible={visible}
      title="Add Featured Product"
      okText="Create"
      cancelText="Cancel"
      confirmLoading={confirmLoading}
      onCancel={() => {
        onCancel();
        setUploadList([]);
      }}
      onOk={() => {
        setConfirmLoading(true);

        const token = localStorage.getItem("token");

        form
          .validateFields()
          .then((values) => {
            const valuesWithImage = { ...values, featuredProductImage };

            if (featuredProductImage) {
              setConfirmLoading(false);
              createFeaturedProduct(valuesWithImage, token)
                .then((res) => res.json())
                .then(({ success, message: msg, error }) => {
                  if (success) {
                    form.resetFields();
                    setUploadList([]);
                    setFeaturedImage(null);
                    onCreate(values);
                    message.success(msg, 3);
                  } else {
                    message.error(error, 5);
                  }
                });
            } else {
              setConfirmLoading(false);
              message.error("FeaturedProductImage required!");
            }
          })

          .catch(({ errors }) => {
            setConfirmLoading(false);
            console.log("Validate Failed:", errors);
          });
      }}
    >
      <Form layout="vertical" form={form}>
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
        <DisplayImage
          imageArray={featuredProductImage ? [featuredProductImage] : []}
          token={token}
          deleteImage={deleteImage}
          handleImageFromState={handleImageFromState}
        />
        <br />
        <Upload
          name="image"
          action="http://localhost:4000/api/v1/image"
          headers={{ Authorization: `Bearer ${token}` }}
          onChange={(info) => handleUpload(info)}
          fileList={uploadList}
          showUploadList={{ showRemoveIcon: false }}
          accept="image/*"
        >
          <Button disabled={uploadButtonStatus} icon={<UploadOutlined />}>
            add image to upload
          </Button>
        </Upload>
      </Form>
    </Modal>
  );
}
