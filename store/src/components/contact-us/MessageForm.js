import React from "react";
import { Link } from "react-router-dom";
import { Typography, Button } from "antd";
import { Row, Col, Grid } from "antd";
import { Input } from "antd";
import styles from "./MessageForm.module.css";
import classNames from "classnames";

const { useBreakpoint } = Grid;
const { TextArea } = Input;
const { Title, Text } = Typography;
const labelStyle = {
  marginBottom: "10px",
  color: "#808080",
  fontSize: "15px",
  fontWeight: "bold",
};
const textAreaStyle = {
  marginBottom: "20px",
};

function MessageForm() {
  const screens = useBreakpoint();
  return (
    <div className={styles.contactUsContainer}>
      <Row gutter={[16, 16]}>
        <Col span={12} xs={24} sm={24} md={24} lg={12}>
          <Title
            className={classNames(
              { [styles.contactTitle]: screens },
              { [styles.contactTitleXs]: screens.xs },
              { [styles.contactTitleMd]: screens.sm },
              { [styles.contactTitleMd]: screens.md },
              { [styles.contactTitleLg]: screens.lg }
            )}
          >
            Message Us
          </Title>
          <p className={styles.longMessageText}>
            If you wish to be considered for employment at Pluto, please do not
            send a message, here – instead, please complete Pluto's job
            application and our Human Resources department will contact you
            after their review of your submitted information
          </p>
        </Col>
        <Col span={12} xs={24} sm={24} md={24} lg={12}>
          <Row gutter={[16, 16]}>
            <Col span={12} xs={24} sm={12}>
              <div style={labelStyle}>
                <label htmlFor="Name">Name</label>
              </div>
              <div>
                <Input size="large" />
              </div>
              <Text type="secondary">First</Text>
            </Col>
            <Col
              span={12}
              xs={24}
              sm={12}
              className={classNames({ [styles.lastLabelStyle]: screens.xs })}
            >
              <div className={styles.lastLabel}>
                <Input size="large" />
              </div>
              <Text type="secondary">Last</Text>
            </Col>
            <Col span={12} xs={24} sm={24} md={12}>
              <div style={labelStyle}>
                <label htmlFor="email">Email</label>
              </div>
              <div>
                <Input size="large" type="email" />
              </div>
            </Col>
          </Row>
          <div style={labelStyle}>
            <label htmlFor="Comments">Comments</label>
          </div>
          <div style={textAreaStyle}>
            <TextArea rows={4} />
          </div>
          <div className={styles.buttonStyle}>
            <Link to="#">
              <Button type="primary" style={{ textTransform: "uppercase" }}>
                Submit
              </Button>
              {/* <ButtonBlack buttonText="Submit" className={styles.buttonStyle} /> */}
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default MessageForm;
