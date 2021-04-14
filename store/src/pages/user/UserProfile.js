import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Grid, Tag, Table } from "antd";
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";
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
  const screens = useBreakpoint();
  const token = useSelector((state) => state.auth.tokenValue);
  const imageId = useSelector((state) => state.file.imageId)
  const [userData, setUserData] = useState([]);
  const [userId, setUserId] = useState(null);
  const [sourceOfImage, setSourceOfImage] = useState([]);
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    if (token || imageId)
      agent
        .getMe(token)
        .then((res) => res.json())
        .then(({ data, error }) => {
          setUserId(data.id);
          if (data.id) {
            agent
              .getSingleUser(data.id)
              .then((res) => res.json())
              .then(({ data }) => {
                const result = data.image.filter(imgId => {
                  return imgId.id === imageId
                })
                setUserData([data]);
                setSourceOfImage([result[0].path])
              })
          }
          if (error) {
            localStorage.removeItem("token");
          }
        });
  }, [token, imageId]);

  useEffect(() => {
    if (token)
      agent
        .getUserOrder(token)
        .then((res) => res.json())
        .then(({ data }) => setUserOrders(data.orders))
        .catch((error) => {
          console.log("Error while fetching user order(s)", error);
        });
  }, [token, userId]);

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
