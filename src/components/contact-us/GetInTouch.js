import React from "react";
import { Row, Col } from "antd";
import Icon from "@ant-design/icons";
import {
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";
import styles from "./GetInTouch.module.css";
const getInTouchData = [
  {
    id: 1,
    imageUrl: EnvironmentOutlined,
    option: "Address",
    title: "Find Us",
    location: "1Hd- 50, 010 Avenue, NY 90001",
  },
  {
    id: 2,
    imageUrl: PhoneOutlined,
    option: "phone",
    title: "Make a Call",
    location: "009-215-5596 (toll free)",
  },
  {
    id: 3,
    imageUrl: MailOutlined,
    option: "email",
    title: "Send Email",
    location: "contact@example.com",
  },
];

function GetInTouch() {
  return (
    <div>
      <Row gutter={[24, 24]} justify="center">
        {getInTouchData.map((element) => {
          return (
            <Col span={8} key={element.id} xs={24} sm={24} md={8} lg={8} xl={8}>
              <div>
                <div className={styles.bodyStyle}>
                  <Icon
                    component={element.imageUrl}
                    style={{ fontSize: "40px", marginBottom: "30px" }}
                  />
                  <h2 className={styles.titleStyle}>{element.title}</h2>
                  <span>{element.location}</span>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default GetInTouch;
