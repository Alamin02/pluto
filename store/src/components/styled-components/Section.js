import React from "react";
import styles from "./Section.module.css";

export default function Section({ heading, children }) {
  return (
    <div>
      <section className={styles.eachSection}>
        <h2 className={styles.eachSectionTitle}>{heading}</h2>
        {children}
      </section>
    </div>
  );
}
