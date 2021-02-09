import React from "react";
import { Col, Button, Row, Collapse } from "antd";
import CheckOutForm from "../components/check-out/CheckOutForm";
import CheckOutRegister from "../components/check-out/CheckOutRegister";
import CheckOutCollapsible from "../components/check-out/CheckOutCollapsible";
import styles from "../components/check-out/CheckOut.module.css";
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
        {/* <div style={{ marginLeft: "300px" }}>
     <Button type="default" htmlType="submit">
       <h3>Continue</h3>
     </Button>
     <Button type="link" htmlType="submit">
       <h3>Forget your Password?</h3>
     </Button>
   </div> */}
      </Panel>
    </Collapse>
  );
};
const title = <h4 style={{ fontWeight: "600" }}>01.CHECK OUT METHOD</h4>;
export default function CheckOut() {
  return (
    <div className={styles.container}>
      <Row justify="center">
        <Col xs={24} sm={24} lg={18}>
          <div style={{ padding: "20px" }}>
            <DescriptionCollapse
              k="a"
              title={title}
              register={<CheckOutRegister />}
              form={<CheckOutForm />}
            />
            {/* </Col> */}
            {/* </Row> */}

            {/* {/* <Row justify="center"> */}
            {/* <Col sm={24} lg={18}> */}

            <CheckOutCollapsible />
          </div>
        </Col>
      </Row>
    </div>
  );
}
