import { Button } from "antd";

import EachProfileItem from "./EachProfileItem";
import userInfo from "./userInfo";

import styles from "./UserProfile.module.css";

function UserProfile() {
  return (
    <div className={styles.container}>
      <h1 className={styles.mainHeading}>Manage my account</h1>

      <section className={styles.eachSection} key={userInfo.key}>
        <h2 className={styles.eachSectionTitle}>Basic Info</h2>
        {userInfo.map((eachItem) => (
          <EachProfileItem type={eachItem.type} data={eachItem.data} />
        ))}
      </section>

      <section className={styles.buttonSection}>
        <Button type="primary">Update Profile</Button>
      </section>
    </div>
  );
}

export default UserProfile;
