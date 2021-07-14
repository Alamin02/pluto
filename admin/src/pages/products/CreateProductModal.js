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
  Image,
} from "antd";
import { PlusOutlined, CloseCircleOutlined } from "@ant-design/icons";

import {
  createProduct,
  deleteProductImage,
} from "../../client/products.client";
import { getOffers } from "../../client/offers.client";
import { getCategories } from "../../client/category.client";

const { Option } = Select;

const imageStyle = {
  display: "inline-block",
  position: "relative",
};

const titleStyle = {
  display: "inline-block",
  position: "absolute",
  top: "40%",
  width: "300px",
  margin: "0px 20px",
};

const deleteButtonStyle = {
  cursor: "pointer",
  position: "absolute",
  marginLeft: "325px",
  top: "40%",
  fontSize: "25px",
  color: "red",
};
export default function ProductForm({ visible, onCreate, onCancel }) {
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [offerOptions, setOfferOptions] = useState([]);
  const [uploadButtonStatus, setUploadButtonStatus] = useState(false);
  const [uploadList, setUploadList] = useState([]);
  const token = localStorage.getItem("token");

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
  const handleImageFromState = (id) =>
    setProductImages(
      productImages.filter((productImage) => productImage.id !== id)
    );

  const handleImage = () => {
    setProductImages([]);
    setUploadList([]);
  };

  useEffect(() => {
    if (uploadList.length === 4) {
      setUploadButtonStatus(true);
    } else {
      setUploadButtonStatus(false);
    }
  }, [uploadList]);

  return (
    <div>
      <Modal
        visible={visible}
        title="Add Product"
        okText="Create"
        cancelText="Cancel"
        onCancel={() => {
          onCancel();
        }}
        onOk={() => {
          const token = localStorage.getItem("token");

          form
            .validateFields()
            .then((values) => {
              let newValues = { ...values, productImages };

              createProduct(newValues, token)
                .then((res) => res.json())
                .then(({ success, message: msg, error }) => {
                  if (success) {
                    form.resetFields();
                    onCreate(values);
                    message.success(msg);
                    handleImage();
                  } else {
                    message.error(error);
                  }
                });
            })

            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form
          layout={"vertical"}
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
          <br />
          <Form.Item>
            {productImages &&
              productImages.map((productImage) => (
                <div key={productImage.id}>
                  <div style={imageStyle}>
                    <Image width={100} height={136} src={productImage.path} />
                    <div style={titleStyle}>
                      <p>{productImage.originalname}</p>
                    </div>

                    <CloseCircleOutlined
                      onClick={() => {
                        deleteProductImage(productImage.id, token);
                        handleImageFromState(productImage.id);
                        setUploadList(
                          uploadList.filter(
                            (image) => image.name !== productImage.originalname
                          )
                        );
                      }}
                      style={deleteButtonStyle}
                    />
                  </div>
                </div>
              ))}
            <Upload
              name="productImages"
              action="http://localhost:4000/api/v1/product-images"
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
              <Button icon={<PlusOutlined />} disabled={uploadButtonStatus}>
                add productImages to upload (maximum: 4)
              </Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
