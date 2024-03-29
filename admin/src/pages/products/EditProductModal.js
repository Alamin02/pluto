import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, Upload, Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { editProduct, deleteProductImage } from "../../client/products.client";
import { getCategories } from "../../client/category.client";
import { getOffers } from "../../client/offers.client";
import DisplayImage from "../../components/DisplayImage";
import baseUrl from "../../client/base-url";

const { Option } = Select;

export default function EditProductModal({
  visible,
  onCreate,
  onCancel,
  existingRecord,
  refetch,
}) {
  const [form] = Form.useForm();
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [offerOptions, setOfferOptions] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [uploadList, setUploadList] = useState([]);
  const [uploadButtonStatus, setUploadButtonStatus] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    form.resetFields();
    if (existingRecord) {
      getCategories()
        .then((res) => res.json())
        .then(({ data }) => {
          if (data) {
            const processedData = data
              .filter((entry) => entry.children !== null)
              .map((entry) => {
                const childrenList = [];

                for (const child of entry.children) {
                  childrenList.push({
                    id: child.id,
                    name: `${entry.name} / ${child.name}`,
                  });
                }

                return childrenList;
              });

            setCategoryOptions(processedData.flat());
          }
        });
      setProductImages(existingRecord.productImage);

      getOffers()
        .then((res) => res.json())
        .then(({ data }) => {
          setOfferOptions(data.offers);
        });
    }
  }, [existingRecord, form]);

  const handleUpload = async (info) => {
    const { status } = info.file;
    setUploadList(info.fileList);
    if (status !== "uploading") {
      const { response } = info.file;
      if (response) {
        setProductImages([...productImages, ...response.data]);
      }
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
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

  const handleImageFromState = (id, originalname) => {
    setProductImages(productImages.filter((image) => image.id !== id));
    setUploadList(uploadList.filter((image) => image.name !== originalname));
  };

  const handleCancelForImage = () => {
    if (productImages.length) {
      onCancel();
      setUploadList([]);
    } else {
      message.error("Products must have an productImage!");
    }
  };

  return (
    <div>
      <Modal
        visible={visible}
        title="Edit Product"
        okText="Save"
        forceRender={true}
        cancelText="Cancel"
        onCancel={() => {
          handleCancelForImage();
        }}
        onOk={() => {
          const token = localStorage.getItem("token");
          form
            .validateFields()
            .then((values) => {
              const newValues = { ...values, productImages };
              if (productImages.length <= 4) {
                editProduct(existingRecord.id, newValues, token)
                  .then((res) => res.json())
                  .then(({ success, message: msg, error }) => {
                    if (success) {
                      form.resetFields();
                      handleResetState();
                      onCreate(values);
                      message.success(msg);
                      refetch();
                    } else {
                      message.error(error);
                    }
                  });
              } else {
                message.error("Only 4 images can be added!");
              }
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
          {/* product name */}
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

          {/* price */}
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

          {/* summary */}
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

          {/* category */}
          <Form.Item
            label="Category"
            rules={[
              {
                required: true,
                message: "Please input product category",
              },
            ]}
            name="categoryId"
            initialValue={
              existingRecord &&
              existingRecord.category &&
              existingRecord.category.name
            }
          >
            {existingRecord && (
              <Select>
                {categoryOptions.map((category) => (
                  <Option value={category.id} key={category.id}>
                    {category.name}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>

          {/* offer */}
          <Form.Item
            label="Offer"
            name="offerId"
            initialValue={
              existingRecord && existingRecord.offer
                ? existingRecord.offer.id
                : "null"
            }
          >
            {existingRecord && (
              <Select>
                {offerOptions.map((offer) => (
                  <Option value={offer.id} key={offer.id}>
                    {offer.name}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>

          {/* image */}
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
              onChange={handleUpload}
              action={`${baseUrl}/product-images`}
              headers={{ Authorization: `Bearer ${token}` }}
              fileList={uploadList}
              showUploadList={{ showRemoveIcon: false }}
              accept="image/*"
              multiple
              maxCount={4}
            >
              <Button icon={<PlusOutlined />} disabled={uploadButtonStatus}>
                Add more productImages to Upload (max: 4)
              </Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
