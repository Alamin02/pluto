import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  message,
  Row,
  Col,
  Dropdown,
  Grid,
  Menu,
  Upload,
  Avatar,
} from "antd";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import classNames from "classnames";
import styles from "./UpdateUserProfile.module.css";
import MainContainer from "../../components/layout/MainContainer";
import HeaderSection from "../../components/styled-components/HeaderSection";
import ResetPasswordForm from "../auth/ForgetPassword";
import AddressUpdateUserProfile from "../../components/address/AddressUpdateUserProfile";

import {
  getProfile,
  updateUserInfo,
  createUserImage,
} from "../../client/users.client";

const { useBreakpoint } = Grid;

export default function UpdateUserProfile() {
  const history = useHistory();
  const screens = useBreakpoint();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [userData, setUserData] = useState({});
  const [userImage, setUserImage] = useState([]);
  const [userId, setUserId] = useState(null);
  const token = useSelector((state) => state.auth.tokenValue);
  const imageData = useSelector((state) => state.file.image);

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
      getProfile(token)
        .then((res) => res.json())
        .then(({ data }) => {
          if (data) {
            setUserId(data.id);
            setUserData(data);
            dispatch({ type: "user/profile", payload: data.image });
          }
        });
  }, [token, dispatch]);

  const onFinish = (values) => {
    console.log(values);
    updateUserInfo(values, userId, token)
      .then((res) => res.json())
      .then(({ success, error, message: msg }) => {
        if (success) {
          localStorage.setItem("token", token);
          dispatch({ type: "auth/login", payload: token });
          message.success(msg);
          history.push("/profile");
        } else {
          message.error(error);
        }
      });
  };

  const editButtonClick = () => {
    const normFile = (e) => {
      console.log("Upload event:", e);
      const formData = new FormData();
      userImage.forEach((userImage) => {
        formData.append("userImage", userImage);
      });

      createUserImage(formData, token)
        .then((res) => res.json())
        .then(({ data }) => {
          localStorage.setItem("data", data);
          dispatch({ type: "user/profile", payload: data });
        });
    };

    return (
      <Menu>
        <Menu.Item>
          <Form
            {...layout}
            form={form}
            initialValues={{
              remember: true,
            }}
          >
            <Form.Item
              name="userImage"
              style={{ marginBottom: "0" }}
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
                showUploadList={false}
              >
                <Button type="primary">Upload a Photo</Button>
              </Upload>
            </Form.Item>
          </Form>
        </Menu.Item>
      </Menu>
    );
  };

  return (
    <MainContainer>
      <HeaderSection headerText="update my profile" />

      <Form
        {...layout}
        form={form}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <section className={styles.eachSection} key={userData.id}>
          <Row gutter={[16, 16]}>
            <Col span={12} md={12} sm={24} xs={24}>
              <h2 className={styles.eachSectionTitle}>Update basic info</h2>

              {/* email */}

              <Form.Item
                {...tailLayout}
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
                initialValue={userData.email}
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
                initialValue={userData.name}
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
                initialValue={userData.phone}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12} md={12} sm={24} xs={24}>
              <h2 className={styles.eachSectionTitle}>Update user Profile</h2>
              <div
                className={classNames(
                  { [styles.basicInfo]: screens },
                  { [styles.basicInfoXs]: screens.xs }
                )}
              >
                <div className={styles.imageBox} key={1}>
                  {imageData ? (
                    <img
                      src={imageData.path}
                      className={classNames(
                        { [styles.userAvatar]: screens },
                        { [styles.userAvatarXs]: screens.xs }
                      )}
                      alt={userData.name}
                    />
                  ) : (
                    <Avatar
                      className={styles.avatarStyle}
                      icon={<UserOutlined />}
                    />
                  )}
                  <div className={styles.editBox}>
                    <Dropdown overlay={editButtonClick} placement="bottomLeft">
                      <EditOutlined />
                    </Dropdown>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </section>

        {/* submit button section */}
        <Form.Item className={styles.buttonSection}>
          <Button type="primary" htmlType="submit">
            Update profile
          </Button>
        </Form.Item>
      </Form>

      {/* address section */}
      <AddressUpdateUserProfile />
      <section className={styles.emptySpace}></section>

      {/* reset password section */}
      <ResetPasswordForm id={userId} />
    </MainContainer>
  );
}
