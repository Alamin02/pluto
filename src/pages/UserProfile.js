import { Link } from "react-router-dom";
import { Button, Grid } from "antd";
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";
import classNames from "classnames";

import styles from "./UserProfile.module.css";

import userInfo from "../components/user-profile/userInfo";
import HeaderSection from "../components/styled-components/HeaderSection";
import appStyles from "../App.module.css";

const { useBreakpoint } = Grid;

function UserProfile() {
  const screens = useBreakpoint();

  return (
    <div className={appStyles.containerMain}>
      <div className={styles.container}>
        {/* <h1 className={styles.mainHeading}>Manage my account</h1> */}
        <HeaderSection headerText="manage my account" />

        <section className={styles.eachSection} key={userInfo.key}>
          <h2 className={styles.eachSectionTitle}>Basic info</h2>
          <div
            className={classNames(
              { [styles.basicInfo]: screens },
              { [styles.basicInfoXs]: screens.xs }
            )}
          >
            <img
              src={userInfo.photo}
              className={classNames(
                { [styles.userAvatar]: screens },
                { [styles.userAvatarXs]: screens.xs }
              )}
              alt="user_photo"
            />
            <div
              className={classNames(
                { [styles.basicInfoText]: screens },
                { [styles.basicInfoTextXs]: screens.xs }
              )}
            >
              <div
                className={classNames(
                  { [styles.welcomeMessage]: screens },
                  { [styles.welcomeMessageXs]: screens.xs }
                )}
              >
                Welcome, {userInfo.name}.
              </div>
              <div>
                <MailOutlined />
                &nbsp;&nbsp;
                {userInfo.email}
              </div>
              <div className={styles.alignItems}>
                <PhoneOutlined />
                &nbsp;&nbsp;
                {userInfo.phone}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.emptySpace}></section>

        <section className={styles.eachSection} key={userInfo.key}>
          <h2 className={styles.eachSectionTitle}>Shipping address</h2>
          <div>Your Product is set to ship to {userInfo.address}</div>
        </section>

        <section className={styles.buttonSection}>
          <Link to="/profile/edit">
            <Button type="primary">Update Profile</Button>
          </Link>
        </section>
      </div>
    </div>
  );
}

export default UserProfile;
