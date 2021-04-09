
import { Form, Input, Button } from "antd";

import styles from "./ResetPasswordForm.module.css";

const ResetPasswordForm = () => {
  const [form] = Form.useForm();
  const layout = {
    labelCol: {
      span: 3,
    },
    wrapperCol: {
      span: 2,
    },
  };
  const tailLayout = {
    labelCol: { span: 3 },
    wrapperCol: {
      span: 8,
      offset: 1,
    },
  };

  const onFinishForPassword = (values) => {
    console.log("password: ", values)
  }

  return (


    <Form
      name="reset-password"
      {...layout}
      form={form}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinishForPassword}
    >
      <section className={styles.passwordSection}>
        <h2 className={styles.passwordSectionTitle}>Update User Password</h2>
        {/* OLd Password */}
        <Form.Item
          {...tailLayout}
          name="password"
          label="Old Password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        {/* New Password */}
        <Form.Item
          {...tailLayout}
          name="password"
          label="New Password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        {/* Confirm Password */}
        <Form.Item
          {...tailLayout}
          name="password"
          label="Confirm Password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            type="password"
            placeholder="Password"
          />
        </Form.Item>

      </section>

      {/* set new password button */}
      <Form.Item className={styles.buttonSection}>
        <Button
          type="primary"
          htmlType="submit"
        >
          Set New Password
              </Button>
      </Form.Item>
    </Form>

  );
};

export default ResetPasswordForm;
