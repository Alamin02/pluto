import React from "react";
import { Button } from "antd";
import styles from "./Button.module.css";

function ViewButton(props) {
  return (
    <div className={styles.viewProducts}>
      <Button type={props.type} className={styles.myButton}>
        View all products
      </Button>
    </div>
  );
}
export default ViewButton;
