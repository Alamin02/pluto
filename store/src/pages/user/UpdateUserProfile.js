import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Form, Input, Button, Select, message, Row, Col, Dropdown, Grid, Menu, Upload } from "antd";
import { EditOutlined } from "@ant-design/icons";
import classNames from "classnames";
import userInfo from "../../components/user-profile/userInfo";
import styles from "./UpdateUserProfile.module.css";
import MainContainer from "../../components/layout/MainContainer";
import shippingAddressList from "../../components/user-profile/shippingAddressList";
import HeaderSection from "../../components/styled-components/HeaderSection";
import { agent } from "../../helpers/agent";
import ResetPasswordForm from "../../components/reset-password/ResetPasswordForm";

const { useBreakpoint } = Grid;
const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}

function UpdateUserProfile() {
  const history = useHistory();
  const screens = useBreakpoint();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [userData, setUserData] = useState([]);
  const [userId, setUserId] = useState(null)
  const [userImage, setUserImage] = useState([]);
  const [sourceOfImage, setSourceOfImage] = useState([]);
  const token = useSelector((state) => state.auth.tokenValue);
  const imageId = useSelector((state) => state.file.imageId)


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
    if (token || imageId)
      agent
        .getMe(token)
        .then((res) => res.json())
        .then(({ data, error }) => {
          if (data.id) {
            setUserId(data.id);
            agent
              .getSingleUser(data.id)
              .then((res) => res.json())
              .then(({ data }) => {
                const result = data.image.filter(imgId => {
                  return imgId.id === imageId
                })
                setUserData([data]);
                if (result.length) {
                  setSourceOfImage([result[0].path])
                }
              });
          }

          if (error) {
            localStorage.removeItem("token");
          }
        });
  }, [token, imageId]);

  const onFinish = (values) => {
    console.log(values);
    agent
      .updateUserInfo(values, userId, token)
      .then(res => res.json())
      .then(({ token }) => {
        if (token) {
          localStorage.setItem("token", token);
          dispatch({ type: "auth/login", payload: token });
          message.success("user update successfully");
          history.push("/profile")
        }
      })
  };

  const editButtonClick = () => {
    const normFile = (e) => {
      console.log("Upload event:", e);
      const formData = new FormData();
      userImage.forEach((userImage) => {
        formData.append("userImage", userImage);
      });

      formData.append("userId", userId);

      agent
        .createUserImage(formData)
        .then((res) => res.json())
        .then(({ data }) => {
          dispatch({ type: "user/profile", payload: data[0].id });
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
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
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
                        <Input size="large" />
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
                    </Col>
                    <Col span={12}>
                      <h2 className={styles.eachSectionTitle}>Update user Profile</h2>
                      <div
                        className={classNames(
                          { [styles.basicInfo]: screens },
                          { [styles.basicInfoXs]: screens.xs }
                        )}
                      >
                        {sourceOfImage && sourceOfImage.length === 1 ? (
                          <div className={styles.imageBox} key={1}>
                            <img
                              src={sourceOfImage[0]}
                              className={classNames(
                                { [styles.userAvatar]: screens },
                                { [styles.userAvatarXs]: screens.xs }
                              )}
                              alt="user_photo"
                            />
                            <div className={styles.editBox}>
                              <Dropdown overlay={editButtonClick} placement="bottomLeft">
                                <EditOutlined />
                              </Dropdown>
                            </div>
                          </div>
                        ) : (
                          <div className={styles.imageBox} key={2}>
                            <img
                              src={userInfo.photo}
                              className={classNames(
                                { [styles.userAvatar]: screens },
                                { [styles.userAvatarXs]: screens.xs }
                              )}
                              alt="user_photo"
                            />
                            <div className={styles.editBox}>
                              <Dropdown overlay={editButtonClick} placement="bottomLeft">
                                <EditOutlined />
                              </Dropdown>
                            </div>
                          </div>
                        )}
                      </div>
                    </Col>
                  </Row>
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
      <ResetPasswordForm id={userId} />
    </MainContainer>
  );
}

export default UpdateUserProfile;

