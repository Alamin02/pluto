import classNames from "classnames";
import { Form, Input, Button } from "antd";
import { LockOutlined } from "@ant-design/icons";

import styles from "./ResetPasswordForm.module.css";
import Heading from "../heading/Heading";

const ResetPasswordForm = () => {
  return (
    <>
      <div className={classNames(styles.bgColor, styles.block)}>
        <div className={styles.containerFluid}>
          <Heading
            headingStyle={styles.titleHolder}
            headingTitle="Reset your Password"
          />
          <Form
            name="reset-password"
            className={classNames(styles.forgetPassForm, styles.containerFluid)}
            initialValues={{
              remember: true,
            }}
          >
            {/* OLd Password */}
            <Form.Item
              name="password"
              label="OLd Password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            {/* New Password */}
            <Form.Item
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
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            {/* Confirm Password */}
            <Form.Item
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
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            {/* Button Block */}
            <Form.Item className={styles.antColRtl}>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.loginFormButton}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordForm;
