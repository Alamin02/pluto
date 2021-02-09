import React from "react";
import { Pagination } from "antd";
import styles from "./Blogs.module.css";

export default function BreadCrump() {
  return (
    <div>
      <div className={styles.paginationContainer}>
        <Pagination defaultCurrent={5} total={50} />
      </div>
    </div>
  );
}
