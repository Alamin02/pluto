import React, { useEffect, useState } from "react";
import { Modal, Form, Input, message, Image, Upload, Button, Spin } from "antd";
import {
  CloseCircleOutlined,
  UploadOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { editOffer, deleteOfferImage } from "../../client/offers.client";

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
  const [uploadButtonStatus, setUploadButtonStatus] = useState(false);
  const [uploadList, setUploadList] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    form.resetFields();
    if (existingRecord) {
      setOfferImages(existingRecord.offerImage);
    }
  }, [existingRecord, form]);

  const handleUpload = async (info) => {
    const { status } = info.file;
    setUploadList(info.fileList);
    const { response } = info.file;

    if (status !== "uploading") {
      if (response) {
        setOfferImages([...offerImages, ...response.data]);
      }
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const handleResetState = () => {
    setOfferImages([]);
    setUploadList([]);
  };

  const handleImageFromState = (id, originalname) => {
    setOfferImages(
      offerImages && offerImages.filter((offerImage) => offerImage.id !== id)
    );
    setUploadList(
      uploadList.filter((offerImage) => offerImage.name !== originalname)
    );
  };

  useEffect(() => {
    if (offerImages.length >= 4) {
      setUploadButtonStatus(true);
    } else {
      setUploadButtonStatus(false);
    }
  }, [offerImages]);

  return (
    <div>
      <Modal
        visible={visible}
        title="Edit offer"
        okText="Save"
        cancelText="Cancel"
        onCancel={() => {
          onCancel();
          setUploadList([]);
        }}
        onOk={() => {
          const token = localStorage.getItem("token");
          form
            .validateFields()
            .then((values) => {
              const valuesWithImages = { ...values, offerImages };

              if (offerImages.length <= 4) {
                editOffer(valuesWithImages, token, existingRecord.id)
                  .then((res) => res.json())
                  .then(({ success, message: msg, error }) => {
                    if (success) {
                      message.success(msg);
                      handleResetState();
                      form.resetFields();
                      onCreate(values);
                    } else {
                      message.error(error);
                    }
                  });
              } else {
                message.error("Only 4 offerImages can be added!");
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

          {offerImages &&
            offerImages.map((offerImage) => (
              <div key={offerImage.id}>
                <div style={imageStyle}>
                  <Image width={100} height={136} src={offerImage.path} />
                  <div style={titleStyle}>
                    <p>{offerImage.originalname}</p>
                  </div>
                  <CloseCircleOutlined
                    onClick={() => {
                      deleteOfferImage(offerImage.id, token);
                      handleImageFromState(
                        offerImage.id,
                        offerImage.originalname
                      );
                    }}
                    style={deleteButtonStyle}
                  />
                </div>
              </div>
            ))}
          <br />

          <Upload
            name="offerImages"
            action="http://localhost:4000/api/v1/offer-images"
            headers={{ Authorization: `Bearer ${token}` }}
            onChange={handleUpload}
            fileList={uploadList}
            showUploadList={{ showRemoveIcon: false }}
            accept="image/*"
            multiple={true}
            maxCount={4}
          >
            <Button disabled={uploadButtonStatus} icon={<PlusOutlined />}>
              Add more images to Upload
            </Button>
          </Upload>
        </Form>
      </Modal>
    </div>
  );
}
