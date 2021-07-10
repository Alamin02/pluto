import React, { useState } from "react";
import { Modal, Form, Input, message, Upload, Button, Spin, Image } from "antd";
import {
  InboxOutlined,
  UploadOutlined,
  LoadingOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { createOffer, deleteOfferImage } from "../../client/offers.client";
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

export default function CreateOfferModal({
  visible,
  onCreate,
  onCancel,
  refetch,
}) {
  const [form] = Form.useForm();

  const [images, setImages] = useState([]);
  const [uploadSpinner, setUploadSpinner] = useState(false);

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleImages = () => {
    setImages([]);
  };

  const handleUpload = async (info) => {
    const { response } = info.file;

    if (response) {
      if (response.success) {
        setImages([...images, ...response.data]);
      }
    }
    const { status } = info.file;
    if (status == "uploading") {
      setUploadSpinner(true);
    }
    if (status === "done") {
      setUploadSpinner(false);
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      setUploadSpinner(false);
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  const handleImageUpload = (id) =>
    setImages(images && images.filter((image) => image.id != id));

  return (
    <div>
      <Modal
        visible={visible}
        title="Add offer"
        okText="Create"
        cancelText="Cancel"
        onCancel={() => {
          onCancel();
          handleImages();
        }}
        onOk={() => {
          const token = localStorage.getItem("token");
          form
            .validateFields()
            .then((values) => {
              const newValues = { ...values, images };

              createOffer(newValues, token)
                .then((res) => res.json())
                .then(({ success, message: msg, error }) => {
                  if (success) {
                    form.resetFields();
                    onCreate(values);
                    message.success(msg);
                  } else {
                    message.error(error);
                  }
                });
            })
            .catch((info) => {
              console.log("Validate Failed");
            });
          handleImages();
        }}
      >
        <Form
          form={form}
          layout="vertical"
          // initialValues={{
          //   // modifier: "public",
          // }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          {/* offer name */}
          <Form.Item
            name="name"
            label="Offer Name&nbsp;:"
            rules={[
              {
                required: true,
                message: "Please enter offer name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          {/* discount */}
          <Form.Item
            name="discount"
            label="Discount&nbsp;:"
            rules={[
              {
                required: true,
                message: "Please enter discount!",
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
                message: "Please enter description!",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          {images &&
            images.map((offerImage) => (
              <div key={offerImage.id}>
                <div style={imageStyle}>
                  <Image width={100} height={136} src={offerImage.path} />
                  <div style={titleStyle}>
                    <p>{offerImage.originalname}</p>
                  </div>

                  <CloseCircleOutlined
                    onClick={() => {
                      deleteOfferImage(offerImage.id);
                      handleImageUpload(offerImage.id);
                    }}
                    style={deleteButtonStyle}
                  />
                </div>
              </div>
            ))}
          {!uploadSpinner ? (
            <Upload
              name="offerImages"
              action="http://localhost:4000/api/v1/offer-image"
              onChange={handleUpload}
              showUploadList={false}
              accept="image/*"
              multiple={true}
            >
              <Button icon={<UploadOutlined />}>Add offer Images</Button>
            </Upload>
          ) : (
            <span>
              <Spin indicator={<LoadingOutlined />} /> Uploading...
            </span>
          )}
        </Form>
      </Modal>
    </div>
  );
}
