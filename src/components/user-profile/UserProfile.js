import { Button } from "antd";
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";

import userInfo from "./userInfo";

import styles from "./UserProfile.module.css";

function UserProfile() {
  return (
    <div className={styles.container}>
      <h1 className={styles.mainHeading}>Manage my account</h1>

      <section className={styles.eachSection} key={userInfo.key}>
        <h2 className={styles.eachSectionTitle}>Basic info</h2>
        <div className={styles.basicInfo}>
          <div>
            <img
              src={userInfo.photo}
              className={styles.userAvatar}
              alt="user_photo"
            />
          </div>
          <div className={styles.basicInfoText}>
            <div className={styles.welcomeMessage}>
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
        <Button type="primary">Update Profile</Button>
      </section>
    </div>
  );
}

export default UserProfile;
