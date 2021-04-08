import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Grid } from "antd";
import { MailOutlined, PhoneOutlined, EditOutlined } from "@ant-design/icons";
import classNames from "classnames";
import styles from "./UserProfile.module.css";
import MainContainer from "../../components/layout/MainContainer";
import userInfo from "../../components/user-profile/userInfo";
import HeaderSection from "../../components/styled-components/HeaderSection";
import { agent } from "../../helpers/agent";
import Section from "../../components/styled-components/Section";

const { useBreakpoint } = Grid;

function UserProfile() {
  const screens = useBreakpoint();
  const token = useSelector((state) => state.auth.tokenValue);

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    if (token)
      agent
        .getMe(token)
        .then((res) => res.json())
        .then(({ data, error }) => {
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
            <div className={styles.imageBox}>
              <img
                src={userInfo.photo}
                className={classNames(
                  { [styles.userAvatar]: screens },
                  { [styles.userAvatarXs]: screens.xs }
                )}
                alt="user_photo"
              />
              <div className={styles.editBox}>
                <EditOutlined />
              </div>
            </div>

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

        <section className={styles.emptySpace}></section>

        <Section heading="Shipping address">
          <div>Your Product is set to ship to {userInfo.address}</div>
        </Section>

        <section className={styles.buttonSection}>
          <Link to="/profile/edit">
            <Button type="primary">Update Profile</Button>
          </Link>
        </section>
      </div>
    </MainContainer>
  );
}

export default UserProfile;
