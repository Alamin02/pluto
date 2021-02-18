import React, { useState } from "react";
import { Radio, Collapse, Space } from "antd";

const radioStyle = {
  display: "block",
  height: "30px",
  lineHeight: "30px",
};
const { Panel } = Collapse;

export default function CheckOutRegister() {
  const [state, setState] = useState(1);
  const radioChange = (e) => {
    const v = e.target.value;
    setState(v);
  };
  const textUpper = {
    textTransform: "uppercase",
    fontWeight: "600",
  };
  return (
    <>
      <Space direction="vertical">
        <b>Check As A Guest Register</b>
        <p>Register with us for future convenience</p>

        <Radio.Group value={state}>
          <Radio style={radioStyle} onChange={radioChange} value={1}>
            <span style={textUpper}> checked as register</span>
          </Radio>
          <Radio style={radioStyle} onChange={radioChange} value={2}>
            <span style={textUpper}> Register</span>
          </Radio>
        </Radio.Group>

        <b>Register and Save Change</b>
        <p>Register with us for future convenience</p>

        <Collapse bordered={false} ghost>
          <Panel header="Fast And Easy Checkout">
            <p>Fast And Easy Checkout</p>
          </Panel>
          <Panel header="Easy access to your order history and status">
            <p>Easy access to your order history and status </p>
          </Panel>
        </Collapse>
      </Space>
    </>
  );
}
