import React from "react";
import { Col, Button, Row, Collapse } from "antd";
import CheckOutForm from "../components/check-out/CheckOutForm";
import CheckOutRegister from "../components/check-out/CheckOutRegister";
import CheckOutCollapsible from "../components/check-out/CheckOutCollapsible";
import "../components/check-out/CheckOut.module.css";
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
        <div style={{ marginLeft: "300px" }}>
          <Button type="default" htmlType="submit">
            <h3>Continue</h3>
          </Button>
          <Button type="link" htmlType="submit">
            <h3>Forget your Password?</h3>
          </Button>
        </div>
      </Panel>
    </Collapse>
  );
};
const title = <h4 style={{ fontWeight: "600" }}>01.CHECK OUT METHOD</h4>;
export default function CheckOut() {
  return (
    <div style={{ marginBottom: "50px" }}>
      <Row justify="center">
        <Col span="12">
          <DescriptionCollapse
            k="a"
            title={title}
            register={<CheckOutRegister />}
            form={<CheckOutForm />}
          />
        </Col>
      </Row>

      <Row justify="center">
        <Col span="12">
          <CheckOutCollapsible />
        </Col>
      </Row>
    </div>
  );
}
