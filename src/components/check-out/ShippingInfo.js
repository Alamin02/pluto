import { Row, Col, Select } from "antd";
import React, { useState } from "react";
const { Option } = Select;
export default function ShippingInfo() {
  const [Address, setAddress] = useState("khulna");
  const handleChange = (value) => {
    setAddress(value);
  };
  return (
    <div>
      <Row>
        <Col span={12}>
          <span style={{ fontSize: "16px" }}>Shipping Place: {Address}</span>
        </Col>
        <Col span={12}>
          <Select
            defaultValue="Choose Another"
            size={"large"}
            style={{ width: 180 }}
            onChange={handleChange}
          >
            <Option value="Dhaka">Dhaka</Option>
            <Option value="Khulna">Khulna</Option>
            <Option value="Pabna">Pabna</Option>
          </Select>
        </Col>
      </Row>
    </div>
  );
}
