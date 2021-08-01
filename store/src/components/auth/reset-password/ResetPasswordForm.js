import { Form, Input, Button, message } from "antd";
import styles from "./ResetPasswordForm.module.css";
import Section from "../../styled-components/Section";
// import { agent } from "../../../helpers/agent";

const ResetPasswordForm = ({ id }) => {
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
    // agent
    //   .updateUserPassword(values, id)
    //   .then((res) => res.json())
    //   .then(({ info }) => {
    //     if (info) {
    //       message.success(" Password updated successfully");
    //       form.resetFields();
    //     } else {
    //       message.error(
    //         " The password you entered doesn't match with the older one"
    //       );
    //       form.resetFields();
    //     }
    //   });
  };

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
      <Section heading="Update User Password">
        {/* OLd Password */}
        <Form.Item
          {...tailLayout}
          name="password"
          label="Old Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input type="password" placeholder="Password" />
        </Form.Item>
        {/* New Password */}
        <Form.Item
          {...tailLayout}
          name="newPassword"
          label="New Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input type="password" placeholder="Password" />
        </Form.Item>
        {/* Confirm Password */}
        <Form.Item
          {...tailLayout}
          name="confirm password"
          label="Confirm Password"
          dependencies={["newPassword"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  "The two passwords that you entered do not match!"
                );
              },
            }),
          ]}
        >
          <Input type="password" placeholder="Password" />
        </Form.Item>
      </Section>

      {/* set new password button */}
      <Form.Item className={styles.buttonSection}>
        <Button type="primary" htmlType="submit">
          Set New Password
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ResetPasswordForm;
