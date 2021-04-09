import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Form, Input, Button, Select } from "antd";

import styles from "./UpdateUserProfile.module.css";
import MainContainer from "../../components/layout/MainContainer";
import userInfo from "../../components/user-profile/userInfo";
import shippingAddressList from "../../components/user-profile/shippingAddressList";
import HeaderSection from "../../components/styled-components/HeaderSection";
import { agent } from "../../helpers/agent";
import ResetPasswordForm from "../../components/reset-password/ResetPasswordForm"

const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}

function UpdateUserProfile() {
  const [form] = Form.useForm();
  const token = useSelector((state) => state.auth.tokenValue);
  const [userData, setUserData] = useState([]);

  const layout = {
    labelCol: {
      span: 3,
    },
    wrapperCol: {
      span: 2,
    },
  };

  const tailLayout = {
    labelCol: { span: 3 },
    wrapperCol: {
      span: 8,
      offset: 1,
    },
  };

  useEffect(() => {
    if (token)
      agent
        .getMe(token)
        .then((res) => res.json())
        .then(({ data, error }) => {
          if (data.id) {
            // setUserId(data.id);
            agent
              .getSingleUser(data.id)
              .then((res) => res.json())
              .then(({ data }) => setUserData([data]));
          }

          if (error) {
            localStorage.removeItem("token");
          }
        });
  }, [token]);

  const onFinish = (values) => {
    console.log(values);
  };



  return (
    <MainContainer>
      <div className={styles.container}>
        <HeaderSection headerText="update my profile" />
        <Form
          {...layout}
          form={form}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          {userData.length === 1 &&
            userData.map((data) => {
              return (
                <section className={styles.eachSection} key={data.id}>
                  <h2 className={styles.eachSectionTitle}>Update basic info</h2>
                  {/* email */}

                  <Form.Item
                    {...tailLayout}
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: false,
                        message: "Please input your email!",
                      },
                    ]}
                    initialValue={data.email}
                  >
                    <Input />
                  </Form.Item>

                  {/* name */}
                  <Form.Item
                    {...tailLayout}
                    label="Name"
                    name="name"
                    rules={[
                      {
                        required: false,
                        message: "Please input your name!",
                      },
                    ]}
                    initialValue={data.name}
                  >
                    <Input />
                  </Form.Item>

                  {/* phone */}
                  <Form.Item
                    {...tailLayout}
                    label="Phone number"
                    name="phone"
                    rules={[
                      {
                        required: false,
                        message: "Please input your phone number!",
                      },
                    ]}
                    initialValue={data.phone}
                  >
                    <Input />
                  </Form.Item>
                </section>
              );
            })}
          <section className={styles.emptySpace}></section>

          {/* address section */}

          <section className={styles.eachSection}>
            <h2 className={styles.eachSectionTitle}>Update shipping address</h2>
            {/* address */}
            <Form.Item
              {...tailLayout}
              label="Address"
              name="address"
              rules={[
                {
                  required: false,
                  message: "Please input your name!",
                },
              ]}
            >
              {/* <Input /> */}
              <Select
                placeholder="Choose your Location"
                onChange={handleChange}
              >
                {shippingAddressList.map((address) => (
                  <Option value={address.address} key={address.id}>
                    {address.address}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </section>

          {/* submit button section */}
          <Form.Item className={styles.buttonSection}>
            <Button type="primary" htmlType="submit">
              Update profile
                </Button>
          </Form.Item>
        </Form>
      </div>

      {/* reset password section */}
      <ResetPasswordForm />
    </MainContainer>

  );
}

export default UpdateUserProfile;


//.............................//
// const [userImage, setUserImage] = useState([]);
// const [userId, setUserId] = useState(null);

// const normFile = (e) => {
//   const dataOfImage = {};
//   console.log("Upload event:", e);
//   const formData = new FormData();
//   userImage.forEach((userImage) => {
//     formData.append("userImage", userImage);
//   });

//   formData.append("userId", userId);

//   agent
//     .createUserImage(formData)
//     .then((res) => res.json())
//     .then(({ data }) => {
//       console.log(data[0].path);
//       dataOfImage.imagePath = data[0].path;
//     });

//   return dataOfImage;
// };

{/* image
                  <Form.Item
                    {...tailLayout}
                    label="Photo"
                    name="userImage"
                    rules={[
                      {
                        required: false,
                        message: "Please select photo!",
                      },
                    ]}
                    valuePropName="dataOfImage"
                    getValueFromEvent={normFile}
                  >
                    <Upload
                      name="files"
                      beforeUpload={(file, fileList) => {
                        setUserImage(fileList);
                        return false;
                      }}
                      listType="picture"
                      maxCount={1}
                    >
                      <Button icon={<UploadOutlined />}>
                        Select file (Max: 1)
                      </Button>
                    </Upload>
                  </Form.Item> */}

//.............................//
