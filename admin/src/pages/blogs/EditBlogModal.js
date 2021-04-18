import React, { useEffect, useState } from "react";
import { Modal, Form, Input, message, Image, Upload } from "antd";
import { CloseCircleOutlined, InboxOutlined } from "@ant-design/icons";

import { agent } from "../../helpers/agent";

const imageStyle = {
  display: "inline-block",
  position: "relative",
};

const titleStyle = {
  display: "inline-block",
  position: "absolute",
  top: "40%",
  width: "100%",
  marginLeft: "70px",
};

const normFile = (e) => {
  console.log("Upload event:", e);

  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};
export default function EditBlogModal({
  visible,
  onCreate,
  onCancel,
  existingRecord,
  refetch,
}) {
  // reset form when click one row edit button to another row edit button
  const [form] = Form.useForm();
  useEffect(() => {
    form.resetFields();
  }, [existingRecord, form]);
  const [blogImage, setBlogImage] = useState("");
  const warning = "";

  const deleteImage = (e) => {
    agent
      .deleteBlogImage(existingRecord.id)
      .then((res) => res.json())
      .then(({ msg }) => {
        console.log(msg);
        refetch();
      });
  };
  const handleUpload = async (info) => {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
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
        title="Edit blog"
        okText="Save"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          const token = localStorage.getItem("token");
          form
            .validateFields()
            .then((values) => {
              const formData = new FormData();
              formData.append("title", values.title);
              formData.append("author", values.author);
              formData.append("description", values.description);
              formData.append("blogImage", blogImage);

              agent
                .editBlog(formData, token, existingRecord.id)
                .then((res) => res.json())
                .then((data) => {
                  if (!data.errors) {
                    form.resetFields();
                    onCreate(data);
                    message.success(data.msg);
                  } else {
                    for (let error of data.errors) {
                      message.error(error.msg);
                    }
                  }
                });
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form form={form} layout="vertical" initialValues={existingRecord}>
          {/* blog title */}
          <Form.Item
            name="title"
            label="Blog Title&nbsp;:"
            rules={[
              {
                required: true,
                message: "Please enter blog title!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* author */}
          <Form.Item
            name="author"
            label="Author&nbsp;:"
            rules={[
              {
                required: true,
                message: "Please enter author name!",
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
          {/* image */}
          <Form.Item label="BlogImage" name="blogImage">
            {existingRecord ? (
              existingRecord.path && (
                <div key={existingRecord.id} style={imageStyle}>
                  <Image width={100} src={existingRecord.path} />
                  <div style={titleStyle}>
                    <p>{existingRecord.path}</p>
                  </div>
                  <CloseCircleOutlined
                    onClick={deleteImage}
                    style={{
                      cursor: "pointer",
                      position: "absolute",
                      marginLeft: "300px",
                      top: "40%",
                      fontSize: "25px",
                      color: "red",
                    }}
                  />
                </div>
              )
            ) : (
              <p>{warning}</p>
            )}
          </Form.Item>
          <Form.Item label="Add new blogImage">
            <Form.Item
              name="blogImage"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              noStyle
            // rules={[
            //   {
            //     required: true,
            //     message: "Please input blogImage",
            //   },
            // ]}
            >
              <Upload.Dragger
                name="files"
                onChange={handleUpload}
                beforeUpload={(file, fileList) => {
                  setBlogImage(file);
                  return false;
                }}
                accept="image/*"
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload.
                </p>
              </Upload.Dragger>
            </Form.Item>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
