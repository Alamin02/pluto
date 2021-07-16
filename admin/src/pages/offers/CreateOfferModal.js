import React, { useEffect, useState } from "react";
import { Modal, Form, Input, message, Upload, Button, Image } from "antd";
import { UploadOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { createOffer, deleteOfferImage } from "../../client/offers.client";
import DisplayImage from "../../components/DisplayImage";

// const imageStyle = {
//   display: "inline-block",
//   position: "relative",
// };

// const titleStyle = {
//   display: "inline-block",
//   position: "absolute",
//   top: "40%",
//   width: "300px",
//   margin: "0px 20px",
// };

// const deleteButtonStyle = {
//   cursor: "pointer",
//   position: "absolute",
//   marginLeft: "325px",
//   top: "40%",
//   fontSize: "25px",
//   color: "red",
// };

export default function CreateOfferModal({ visible, onCreate, onCancel }) {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [offerImages, setOfferImages] = useState([]);
  const [uploadButtonStatus, setUploadButtonStatus] = useState(false);
  const [uploadList, setUploadList] = useState([]);
  const token = localStorage.getItem("token");

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleResetState = () => {
    setOfferImages([]);
    setUploadList([]);
  };

  const handleUpload = async (info) => {
    const { response } = info.file;
    setUploadList(info.fileList);
    if (response) {
      if (response.success) {
        setOfferImages([...offerImages, ...response.data]);
      }
    }
    const { status } = info.file;

    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  const handleImageFromState = (id, originalname) => {
    setOfferImages(
      offerImages && offerImages.filter((offerImage) => offerImage.id !== id)
    );
    setUploadList(
      uploadList &&
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
        title="Add offer"
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
              const newValues = { ...values, offerImages };

              if (offerImages.length <= 4) {
                createOffer(newValues, token)
                  .then((res) => res.json())
                  .then(({ success, message: msg, error }) => {
                    setConfirmLoading(false);
                    if (success) {
                      form.resetFields();
                      handleResetState();
                      onCreate(values);
                      message.success(msg, 3);
                    } else {
                      message.error(error, 5);
                    }
                  });
              } else {
                setConfirmLoading(false);
                message.error("Only 4 offerImages can be added!");
              }
            })
            .catch((info) => {
              setConfirmLoading(false);
              console.log("Validate Failed");
            });
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

          {/* {offerImages &&
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
            ))} */}

          <DisplayImage
            imageArray={offerImages}
            token={token}
            deleteImage={deleteOfferImage}
            handleImageFromState={handleImageFromState}
          />

          <Upload
            name="offerImages"
            action="http://localhost:4000/api/v1/offer-images"
            headers={{ Authorization: `Bearer ${token}` }}
            onChange={(info) => handleUpload(info)}
            fileList={uploadList}
            showUploadList={{ showRemoveIcon: false }}
            multiple
            accept="image/*"
          >
            <Button disabled={uploadButtonStatus} icon={<UploadOutlined />}>
              Add offerImages to upload (max: 4 )
            </Button>
          </Upload>
        </Form>
      </Modal>
    </div>
  );
}
