import React from "react";
import { Col, Row, Collapse } from "antd";

import CheckOutForm from "../../components/check-out/CheckOutForm";
import CheckOutRegister from "../../components/check-out/CheckOutRegister";
import CheckOutCollapsible from "../../components/check-out/CheckOutCollapsible";
import styles from "../../components/check-out/CheckOut.module.css";
import HeaderSection from "../../components/styled-components/HeaderSection";
import MainContainer from "../../components/layout/MainContainer";

const { Panel } = Collapse;

const DescriptionCollapse = ({ title, key, register, form }) => {
  return (
    <Collapse
      expandIconPosition="right"
      bordered={true}
      defaultActiveKey={["a"]}
    >
      <Panel header={title} key={key} showArrow={false}>
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
    <MainContainer>
      <div className={styles.container}>
        <HeaderSection headerText="check out" />
        <Row justify="center">
          <Col xs={24} sm={24} md={22} lg={18}>
            <div style={{ padding: "20px" }}>
              <DescriptionCollapse
                key="a"
                title={title}
                register={<CheckOutRegister />}
                form={<CheckOutForm />}
              />
              <CheckOutCollapsible />
            </div>
          </Col>
        </Row>
      </div>
    </MainContainer>
  );
}
