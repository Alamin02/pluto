import React from "react";
import { Col, Row, Collapse } from "antd";
import CheckOutForm from "../components/check-out/CheckOutForm";
import CheckOutRegister from "../components/check-out/CheckOutRegister";
import CheckOutCollapsible from "../components/check-out/CheckOutCollapsible";
import styles from "../components/check-out/CheckOut.module.css";
import HeaderSection from "../components/styled-components/HeaderSection";
import appStyles from "../App.module.css";
const { Panel } = Collapse;

const DescriptionCollapse = ({ title, k, register, form }) => {
  return (
    <Collapse
      expandIconPosition="right"
      bordered={true}
      defaultActiveKey={["a"]}
    >
      <Panel header={title} key={k} showArrow={false}>
        <span>{register}</span>
        <span>{form}</span>
        <br></br>
      </Panel>
    </Collapse>
  );
};
const title = <h4 style={{ fontWeight: "600" }}>01.CHECK OUT METHOD</h4>;
export default function CheckOut() {
  return (
    <div className={appStyles.containerMain}>
      <div className={styles.container}>
        <HeaderSection headerText="check out" />
        <Row justify="center">
          <Col xs={24} sm={24} md={22} lg={18}>
            <div style={{ padding: "20px" }}>
              <DescriptionCollapse
                k="a"
                title={title}
                register={<CheckOutRegister />}
                form={<CheckOutForm />}
              />
              <CheckOutCollapsible />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
