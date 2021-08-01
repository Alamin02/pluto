import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Upload,
  Cascader,
  message,
  Select,
  Button,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

import {
  createProduct,
  deleteProductImage,
} from "../../client/products.client";
import { getOffers } from "../../client/offers.client";
import { getCategories } from "../../client/category.client";
import DisplayImage from "../../components/DisplayImage";
import baseUrl from "../../client/base-url";

const { Option } = Select;

export default function ProductForm({ visible, onCreate, onCancel }) {
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [offerOptions, setOfferOptions] = useState([]);
  const [uploadButtonStatus, setUploadButtonStatus] = useState(false);
  const [uploadList, setUploadList] = useState([]);
  const token = localStorage.getItem("token");
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

    setUploadList(info.fileList);
    if (status === "done") {
      const { response } = info.file;
      if (response) {
        setProductImages([...productImages, ...response.data]);
      }

      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  const handleImageFromState = (id, originalname) => {
    setProductImages(
      productImages.filter((productImage) => productImage.id !== id)
    );
    setUploadList(uploadList.filter((image) => image.name !== originalname));
  };

  const handleResetState = () => {
    setProductImages([]);
    setUploadList([]);
  };

  useEffect(() => {
    if (productImages.length >= 4) {
      setUploadButtonStatus(true);
    } else {
      setUploadButtonStatus(false);
    }
  }, [productImages]);

  return (
    <div>
      <Modal
        form={form}
        forceRender={true}
        visible={visible}
        title="Add Product"
        okText="Create"
        cancelText="Cancel"
        onCancel={() => {
          onCancel();
          setUploadList([]);
        }}
        confirmLoading={confirmLoading}
        onOk={() => {
          setConfirmLoading(true);

          const token = localStorage.getItem("token");

          form
            .validateFields()
            .then((values) => {
              let newValues = { ...values, productImages };

              createProduct(newValues, token)
                .then((res) => res.json())
                .then(({ success, message: msg, error }) => {
                  setConfirmLoading(false);
                  if (success) {
                    form.resetFields();
                    onCreate(values);
                    handleResetState();
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
          layout={"vertical"}
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
                  <Option value={offer.id} id={offer.id} key={offer.id}>
                    {offer.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <DisplayImage
              imageArray={productImages}
              token={token}
              deleteImage={deleteProductImage}
              handleImageFromState={handleImageFromState}
            />
            <br />
            <Upload
              name="productImages"
              action={`${baseUrl}/product-images`}
              headers={{ Authorization: `Bearer ${token}` }}
              onChange={handleUpload}
              fileList={uploadList}
              showUploadList={{
                showRemoveIcon: false,
              }}
              multiple
              accept="image/*"
              maxCount={4}
            >
              <Button icon={<UploadOutlined />} disabled={uploadButtonStatus}>
                add productImages to upload (max: 4)
              </Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
