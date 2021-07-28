import { Form, Input } from "antd";

const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export default function Settings() {
  return (
    <Form {...formLayout}>
      <Form.Item label="Phone" name="phone">
        <Input />
      </Form.Item>
      <Form.Item label="Address" name="address">
        <Input />
      </Form.Item>
      <Form.Item label="Email" name="email">
        <Input />
      </Form.Item>
      <Form.Item label="Logo URL" name="logo">
        <Input />
      </Form.Item>
    </Form>
  );
}
