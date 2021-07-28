import { Form, Input, Button } from "antd";
import { SettingOutlined } from "@ant-design/icons";

const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const formTailout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default function Settings() {
  const onFinish = (value) => {
    console.log("success", value);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("error", errorInfo);
  };
  return (
    <div style={{ width: "40vw" }}>
      <h1>
        <SettingOutlined />
        &nbsp; Settings
      </h1>
      <hr />
      <Form
        {...formLayout}
        size="large"
        name="settings"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            {
              required: true,
              message: "Please input your phonenumber!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[
            {
              required: true,
              type: "string",
              message: "please input your address!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please input your valid email!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Logo URL"
          name="logo"
          rules={[{ required: true, message: "Please input logo URL " }]}
        >
          <Input />
        </Form.Item>
        <Form.Item {...formTailout}>
          <Button type="primary" htmlType="submit" size="middle">
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
