import React from "react";
import { Typography } from "antd";
import "antd/dist/antd.css";
import styles from "./MainHeader.module.css";

const { Title } = Typography;

const myTitle = {
  color: "#fff",
  textTransform: "uppercase",
};
const MainHeader = ({ name, sub }) => {
  return (
    <div className={styles.productDetails}>
      <Title style={myTitle}>{name}</Title>
      <Title level={5} style={myTitle}>
        {sub}
      </Title>
    </div>
  );
};

export default MainHeader;
