import React from "react";
import { Col, Button, Row, Card } from "antd";
import CheckOutForm from "./CheckOutForm";
import CheckOutRegister from "./CheckOutRegister";
import CheckOutCollapsible from "./CheckOutCollapsible";
import "./CheckOut.module.css";

export default function CheckOut() {
  return (
    <div>
      <Row justify="center">
        <Col span="12">
          
          <Card
            title={
              <b style={{ textTransform: "uppercase" }}>01.Check out Method</b>
            }
          >
            <Row gutter={[16, 8]}>
              <Col span="10" offset={1}>
                <CheckOutRegister />
              </Col>

              <Col span="11" offset={1}>
                <CheckOutForm />
              </Col>
            </Row>

            <Row>
              <Col offset={10} />

              <Button type="default" htmlType="submit">
                <h3>Continue</h3>
              </Button>
              <Button type="link" htmlType="submit">
                <h3>Forget your Password?</h3>
              </Button>
            </Row>
          </Card>
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
