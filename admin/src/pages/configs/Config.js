import React, { useState } from "react";
import { Form, Input, Button, Radio } from "antd";

const Config = () => {
  const [form] = Form.useForm();

  return (
    <Form>
      <Form.Item label="Field A">
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item label="Field B">
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item>
        <Button type="primary">Submit</Button>
      </Form.Item>
    </Form>
  );
};
export default Config;
