import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Grid, Tag, Table, Avatar } from "antd";
import { MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import classNames from "classnames";
import styles from "./UserProfile.module.css";
import MainContainer from "../../components/layout/MainContainer";
import HeaderSection from "../../components/styled-components/HeaderSection";
import Section from "../../components/styled-components/Section";
import Address from "../../components/address/Address";

import { getProfile, getUserOrder } from "../../client/users.client";

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
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    render: (address) => {
      if (address) {
        return <span>{address.address}</span>;
      }
    },
  },
];

function UserProfile() {
  const screens = useBreakpoint();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.tokenValue);
  const imageData = useSelector((state) => state.file.image);
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState({});
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    if (token) {
      getProfile(token)
        .then((res) => res.json())
        .then(({ data }) => {
          if (data) {
            setUserId(data.id);
            setUserData(data);
            dispatch({ type: "user/profile", payload: data.image });
          }
        });
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (token)
      getUserOrder(token)
        .then((res) => res.json())
        .then(({ data }) => setUserOrders(data.orders))
        .catch((error) => {
          console.log("Error while fetching user order(s)", error);
        });
  }, [token, userId]);

  return (
    <MainContainer>
      <HeaderSection headerText="manage my account" />
      <Section heading="Basic info">
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
              <Avatar className={styles.avatarStyle} icon={<UserOutlined />} />
            )}
          </div>

          <div
            className={classNames(
              { [styles.basicInfoText]: screens },
              { [styles.basicInfoTextXs]: screens.xs }
            )}
            key={userData.id}
          >
            <div
              className={classNames(
                { [styles.welcomeMessage]: screens },
                { [styles.welcomeMessageXs]: screens.xs }
              )}
            >
              Welcome, {userData.name}.
            </div>
            <div>
              <MailOutlined />
              &nbsp;&nbsp;
              {userData.email}
            </div>
            <div
              className={classNames(
                { [styles.phoneNumber]: screens },
                { [styles.phoneNumberXs]: screens.xs }
              )}
            >
              <PhoneOutlined />
              &nbsp;&nbsp;
              {userData.phone}
            </div>
          </div>
        </div>
      </Section>

      <section className={styles.emptySpace}></section>

      <Section heading="Your shipping addresses">
        <Address />
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
          <Table
            columns={columns}
            bordered
            dataSource={userOrders}
            pagination={false}
          />
        )}
      </Section>

      <br />
    </MainContainer>
  );
}

export default UserProfile;
