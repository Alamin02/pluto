import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  Image,
  Upload,
  Button,
  message,
} from "antd";
import { CloseCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { agent } from "../../helpers/agent";

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

  const deleteImage = (productId) => {
    agent
      .deleteImage(productId)
      .then((res) => res.json())
      .then(({ data }) => {
        refetch();
      });
  };

  const normFile = (e) => {
    console.log("Upload event:", e);

    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  useEffect(() => {
    form.resetFields();
    if (existingRecord) {
      agent
        .getCategories()
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

      agent.getOffers().then((data) => {
        setOfferOptions(data);
      });
    }
  }, [existingRecord, form]);

  const handleUpload = async (info) => {
    const { status } = info.file;
    if (status !== "uploading") {
      const formData = new FormData();
      productImages.forEach((productImage) => {
        formData.append("productImages", productImage);
      });

      formData.append("productId", existingRecord.id);

      agent
        .createProductImage(formData)
        .then((res) => console.log(res))
        .then(() => refetch());
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
                .editProduct(existingRecord.id, values, token)
                .then((res) => res.json())
                .then(() => {
                  refetch();
                });

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
            initialValue={existingRecord && existingRecord.category && existingRecord.category.id}
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
            initialValue={existingRecord && existingRecord.offer && existingRecord.offer.id}
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
          <Form.Item
            label="Product Images"
            name="productImages"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            noStyle
          >
            {existingRecord &&
              existingRecord.images &&
              existingRecord.images.map((image) => (
                <div key={image.id}>
                  <div style={imageStyle}>
                    <Image width={100} height={136} src={image.path} />
                    <div style={titleStyle}>
                      <p>{image.originalname}</p>
                    </div>
                    <CloseCircleOutlined
                      onClick={() => deleteImage(image.id)}
                      style={deleteButtonStyle}
                    />
                  </div>
                </div>
              ))}
            <br />
            <Upload
              name="files"
              onChange={handleUpload}
              beforeUpload={(file, fileList) => {
                setProductImages(fileList);
                return false;
              }}
              showUploadList={false}
              accept="image/*"
              multiple={true}

            >
              <Button icon={<PlusOutlined />}>Add more images to Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
