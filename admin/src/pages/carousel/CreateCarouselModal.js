import React, { useState } from "react";
import { Modal, Form, Input, Upload, message, Button, Image } from "antd";
import { CloseCircleOutlined, UploadOutlined } from "@ant-design/icons";

import { createCarousel, deleteImage } from "../../client/carousels.client";

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

export default function CreateCarouselModal({ visible, onCreate, onCancel }) {
  const [form] = Form.useForm();

  const [carouselImage, setCarouselImage] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [uploadList, setUploadList] = useState([]);

  const token = localStorage.getItem("token");

  const handleUpload = (info) => {
    const { status, name, response } = info.file;
    setUploadList(info.fileList);

    if (status === "done") {
      if (info.file && response) {
        setCarouselImage(response.data);
      }
      message.success(`${name} file uploaded!`);
    } else if (status === "error") {
      message.error(`${name} file upload failed`);
    }
  };
  const handleImageFromState = (originalname) => {
    setUploadList(
      uploadList.filter((image) => image.name !== carouselImage.originalname)
    );
    setCarouselImage(null);
  };

  return (
    <div>
      <Modal
        visible={visible}
        title="Add Carousel"
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
              const valuesWithImage = { ...values, carouselImage };

              createCarousel(valuesWithImage, token)
                .then((res) => res.json())
                .then(({ success, message: msg, error }) => {
                  setConfirmLoading(false);
                  if (success) {
                    form.resetFields();
                    setUploadList([]);
                    setCarouselImage(null);
                    onCreate(values);
                    message.success(msg, 3);
                  } else {
                    message.error(error, 5);
                  }
                });
            })

            .catch(({ errors }) => {
              setConfirmLoading(false);
              console.log("Validate Failed:", errors);
            });
        }}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: "Please input carousel title",
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
                message: "Please input carousel summary",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          {carouselImage && (
            <div>
              <div style={imageStyle}>
                <Image width={100} height={136} src={carouselImage.path} />
                <div style={titleStyle}>
                  <p>{carouselImage.originalname}</p>
                </div>

                <CloseCircleOutlined
                  onClick={() => {
                    deleteImage(carouselImage.id, token);
                    handleImageFromState(carouselImage.originalname);
                  }}
                  style={deleteButtonStyle}
                />
              </div>
            </div>
          )}
          <br />
          <Upload
            name="image"
            action="http://localhost:4000/api/v1/image"
            fileList={uploadList}
            showUploadList={{ showRemoveIcon: false }}
            onChange={(info) => handleUpload(info)}
            accept="image/*"
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>
              Add carosel image to upload
            </Button>
          </Upload>
        </Form>
      </Modal>
    </div>
  );
}
