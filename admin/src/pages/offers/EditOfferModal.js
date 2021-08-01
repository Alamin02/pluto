import React, { useEffect, useState } from "react";
import { Modal, Form, Input, message, Upload, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { editOffer, deleteOfferImage } from "../../client/offers.client";
import DisplayImage from "../../components/DisplayImage";
import baseUrl from "../../client/base-url";

export default function EditOfferModal({
  visible,
  onCreate,
  onCancel,
  existingRecord,
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
  const handleCancelForImage = () => {
    if (offerImages.length) {
      onCancel();
      setUploadList([]);
    } else {
      message.error("Offers must have an offerImage!");
    }
  };
  return (
    <div>
      <Modal
        visible={visible}
        title="Edit offer"
        okText="Save"
        cancelText="Cancel"
        onCancel={() => {
          handleCancelForImage();
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

          <DisplayImage
            imageArray={offerImages}
            token={token}
            deleteImage={deleteOfferImage}
            handleImageFromState={handleImageFromState}
          />
          <br />

          <Upload
            name="offerImages"
            action={`${baseUrl}/offer-images`}
            headers={{ Authorization: `Bearer ${token}` }}
            onChange={handleUpload}
            fileList={uploadList}
            showUploadList={{ showRemoveIcon: false }}
            accept="image/*"
            multiple={true}
            maxCount={4}
          >
            <Button disabled={uploadButtonStatus} icon={<PlusOutlined />}>
              Add more offerImages to Upload (max:4)
            </Button>
          </Upload>
        </Form>
      </Modal>
    </div>
  );
}
