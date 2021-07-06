import React, { useEffect, useState } from "react";
import { Modal, Form, Input, message, Image, Upload, Button } from "antd";
import { CloseCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  editOffer,
  deleteOfferImage as deleteOfferImages,
  createOfferImage,
} from "../../client/offers.client";

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

export default function EditOfferModal({
  visible,
  onCreate,
  onCancel,
  existingRecord,
  refetch,
}) {
  const [form] = Form.useForm();
  const [offerImages, setOfferImages] = useState([]);

  const deleteOfferImage = (offerImageId) => {
    deleteOfferImages(offerImageId)
      .then((res) => res.json())
      .then(({ data }) => refetch());
  };

  const normFile = (e) => {
    console.log("Upload event:", e);

    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const handleUpload = async (info) => {
    const { status } = info.file;
    if (status !== "uploading") {
      const formData = new FormData();
      offerImages.forEach((offerImage) => {
        formData.append("offerImages", offerImage);
      });

      formData.append("offerId", existingRecord.id);

      createOfferImage(formData)
        .then((res) => res.json())
        .then(() => refetch());
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  useEffect(() => {
    form.resetFields();
  }, [existingRecord, form, refetch]);

  return (
    <div>
      <Modal
        visible={visible}
        title="Edit offer"
        okText="Save"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          const token = localStorage.getItem("token");
          form
            .validateFields()
            .then((values) => {
              editOffer(values, token, existingRecord.id)
                .then((res) => res.json())
                .then(({ success, message: msg, error }) => {
                  if (success) {
                    message.success(msg);
                    refetch();
                    form.resetFields();
                    onCreate(values);
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
          form={form}
          layout="vertical"
          initialValues={existingRecord}
          preserve={false}
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
          <Form.Item
            label="Offer Images"
            name="offerImages"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            noStyle
          >
            {existingRecord &&
              existingRecord.offerImage &&
              existingRecord.offerImage.map((offerImage) => (
                <div key={offerImage.id}>
                  <div style={imageStyle}>
                    <Image width={100} height={136} src={offerImage.path} />
                    <div style={titleStyle}>
                      <p>{offerImage.originalname}</p>
                    </div>
                    <CloseCircleOutlined
                      onClick={() => deleteOfferImage(offerImage.id)}
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
                setOfferImages(fileList);
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
