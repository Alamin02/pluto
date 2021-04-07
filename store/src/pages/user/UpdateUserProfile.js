import { useState, useEffect } from "react"
import { useSelector } from "react-redux";
import { Form, Input, Button, Upload, Select, Grid, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import classNames from "classnames";

import styles from "./UpdateUserProfile.module.css";
import MainContainer from "../../components/layout/MainContainer";
import userInfo from "../../components/user-profile/userInfo";
import shippingAddressList from "../../components/user-profile/shippingAddressList";
import HeaderSection from "../../components/styled-components/HeaderSection";
import { agent } from "../../helpers/agent";

const { Option } = Select;
const { useBreakpoint } = Grid;

function handleChange(value) {
  console.log(`selected ${value}`);
}

function UpdateUserProfile() {
  const screens = useBreakpoint();
  const [form] = Form.useForm();
  const token = useSelector((state) => state.auth.tokenValue);
  const [userImage, setUserImage] = useState([]);
  const [userId, setUserId] = useState(null)
  const [imageData, setImageData] = useState([])

  const layout = {
    labelCol: {
      span: 3,
    },
    wrapperCol: {
      span: 2,
    },
  };

  const tailLayout = {
    wrapperCol: {
      span: 8,
    },
  };

  //----------------//
  const [userData, setUserData] = useState([])

  useEffect(() => {
    if (token)
      agent
        .getMe(token)
        .then((res) => res.json())
        .then(({ data, error }) => {
          if (data.id) {
            setUserId(data.id)
            agent
              .getSingleUser(data.id)
              .then((res) => res.json())
              .then(({ data }) =>
                setUserData([data]))
          }

          if (error) {
            localStorage.removeItem("token");
          }
        });
  }, [token]);
  //................//

  //.....................//
  const handleUpload = async (info) => {
    const { status } = info.file;
    if (status !== "uploading") {

      const formData = new FormData();
      userImage.forEach((userImage) => {
        formData.append("userImage", userImage);
      });

      formData.append("userId", userId);


      agent
        .createUserImage(formData)
        .then(res => res.json())
        .then(({ data }) => setImageData(data))

    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  //........................//
  const normFile = (e) => {
    console.log("Upload event:", e);

    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList && imageData;
  };


  const onFinish = (values) => {
    console.log(values)
  }

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
          {(userData.length === 1 && userData.map((data) => {
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
                  <Input
                    className={classNames(
                      { [styles.inputStyle]: screens },
                      { [styles.inputStyleXs]: screens.xs }
                    )}
                  />
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
                  <Input
                    className={classNames(
                      { [styles.inputStyle]: screens },
                      { [styles.inputStyleXs]: screens.xs }
                    )}
                  />
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
                  <Input
                    className={classNames(
                      { [styles.inputStyle]: screens },
                      { [styles.inputStyleXs]: screens.xs }
                    )}
                  />
                </Form.Item>

                {/* image */}
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
                  valuePropName="imageData"
                  getValueFromEvent={normFile}

                >
                  <Upload
                    name="files"
                    onChange={handleUpload}
                    beforeUpload={(file, fileList) => {
                      setUserImage(fileList);
                      return false;
                    }}
                    listType="picture"
                    maxCount={1}

                  >
                    <Button
                      icon={<UploadOutlined />}
                      className={classNames(
                        { [styles.inputStyle]: screens },
                        { [styles.inputStyleXs]: screens.xs }
                      )}
                    >
                      Select file (Max: 1)
                    </Button>
                  </Upload>
                </Form.Item>

                <Form.Item
                  {...tailLayout}
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="Enter new password"
                    className={classNames(
                      { [styles.inputStyle]: screens },
                      { [styles.inputStyleXs]: screens.xs }
                    )}
                  />
                </Form.Item>
              </section>)
          }))}
          <section className={styles.emptySpace}></section>

          {/* 2nd section start */}
          <section className={styles.eachSection} key={userInfo.key}>
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
                className={classNames(
                  { [styles.inputStyle]: screens },
                  { [styles.inputStyleXs]: screens.xs }
                )}
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
          {/* 2nd section end */}

          <Form.Item className={styles.buttonSection}>

            <Button type="primary" htmlType="submit">
              Save changes
              </Button>

          </Form.Item>



        </Form>
      </div>
    </MainContainer>
  );
}

export default UpdateUserProfile;
