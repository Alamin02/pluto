import React from "react";
import { Form, Input, Button, Space } from "antd";
export default function CheckOutForm() {
  return (
    <>
      <Space direction="vertical">
        <b>Are you Already Registered?</b>
        <a href="/">please LogIn below</a>

        <Form
          name="basic"
          style={{ marginTop: "10px", width: "200px" }}
          initialValues={{ remember: true }}
          layout="vertical"
        >
          <Form.Item
            label="Email Address"
            name="Email Address"
            rules={[
              {
                required: true,
                message: "Please input your Email Address!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="default" htmlType="submit">
              <h3>Log In</h3>
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </>
  );
}
