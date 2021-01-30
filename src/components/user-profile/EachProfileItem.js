// this component renders each row in UserProfile

import styles from "./UserProfile.module.css";

function EachProfileItem({ type, data }) {
  return (
    <section className={styles.infoSection}>
      <div className={styles.eachProfileItem}>
        <div className={styles.infoSectionFirstCol}>{type}:</div>
        <div className={styles.infoSectionSecondCol}>{data}</div>
      </div>
    </section>
  );
}

export default EachProfileItem;
