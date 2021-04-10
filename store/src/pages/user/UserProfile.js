import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Grid, Menu, Form, Upload, Dropdown, Tag, Table } from "antd";
import { MailOutlined, PhoneOutlined, EditOutlined } from "@ant-design/icons";
import classNames from "classnames";
import styles from "./UserProfile.module.css";
import MainContainer from "../../components/layout/MainContainer";
import userInfo from "../../components/user-profile/userInfo";
import HeaderSection from "../../components/styled-components/HeaderSection";
import { agent } from "../../helpers/agent";
import Section from "../../components/styled-components/Section";

const { useBreakpoint } = Grid;

const columns = [
  {
    title: "Order status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Payment Method",
    dataIndex: "paymentMethod",
    key: "paymentMethod",
  },
  {
    title: "Products",
    key: "orderedProducts",
    dataIndex: "orderedProducts",
    render: (orderedProducts) => (
      <>
        {orderedProducts.map((product) => {
          return (
            <div>
              <Tag icon={product.quantity} color={"geekblue"}>
                &nbsp;&nbsp;×&nbsp;&nbsp;
                {product.product.name}
              </Tag>
            </div>
          );
        })}
      </>
    ),
  },
];

function UserProfile() {
  const [form] = Form.useForm();
  const screens = useBreakpoint();
  const token = useSelector((state) => state.auth.tokenValue);
  const [userData, setUserData] = useState([]);
  const [userImage, setUserImage] = useState([]);
  const [userId, setUserId] = useState(null);
  const [sourceOfImage, setSourceOfImage] = useState([]);
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    if (token)
      agent
        .getMe(token)
        .then((res) => res.json())
        .then(({ data, error }) => {
          setUserId(data.id);
          if (data.id) {
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

  useEffect(() => {
    if (token)
      agent
        .getUserOrder(userId)
        .then((res) => res.json())
        .then(({ data }) => setUserOrders(data.orders))
        .catch((error) => {
          console.log("Error while fetching user order(s)", error);
        });
  }, [token, userId]);

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

  const editButtonClick = () => {
    const normFile = (e) => {
      const dataOfImage = {};
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
          dataOfImage.imagePath = data[0].path;
          setSourceOfImage([data[0].path]);
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
              {...tailLayout}
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
                showUploadList={false}
              >
                <Button>Upload a Photo</Button>
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
        <HeaderSection headerText="manage my account" />

        <Section heading="Basic info" key={userInfo.key}>
          <div
            className={classNames(
              { [styles.basicInfo]: screens },
              { [styles.basicInfoXs]: screens.xs }
            )}
          >
            {sourceOfImage.length === 1 ? (
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

            {userData.length === 1 &&
              userData.map((data) => {
                return (
                  <div
                    className={classNames(
                      { [styles.basicInfoText]: screens },
                      { [styles.basicInfoTextXs]: screens.xs }
                    )}
                    key={data.id}
                  >
                    <div
                      className={classNames(
                        { [styles.welcomeMessage]: screens },
                        { [styles.welcomeMessageXs]: screens.xs }
                      )}
                    >
                      Welcome, {data.name}.
                    </div>
                    <div>
                      <MailOutlined />
                      &nbsp;&nbsp;
                      {data.email}
                    </div>
                    <div
                      className={classNames(
                        { [styles.phoneNumber]: screens },
                        { [styles.phoneNumberXs]: screens.xs }
                      )}
                    >
                      <PhoneOutlined />
                      &nbsp;&nbsp;
                      {data.phone}
                    </div>
                  </div>
                );
              })}
          </div>
        </Section>

        <section className={styles.buttonSection}>
          <Link to="/profile/edit">
            <Button type="primary">Update Profile</Button>
          </Link>
        </section>

        <section className={styles.emptySpace}></section>

        <Section heading="Your orders">
          {userOrders.length === 0 ? (
            <div>You currently have no orders</div>
          ) : (
            <Table columns={columns} dataSource={userOrders} />
          )}
        </Section>
      </div>

      <br />
    </MainContainer>
  );
}

export default UserProfile;
