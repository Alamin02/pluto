import classNames from "classnames";
import { Form, Input, Button } from "antd";

import styles from "./ForgetPasswordForm.module.css";
import Heading from "../../heading/Heading";

const ForgetPasswordForm = () => {
  return (
    <>
      <div className={classNames(styles.bgColor, styles.block)}>
        <div className={styles.containerFluid}>
          <Heading
            headingStyle={styles.titleHolder}
            headingTitle="Recover Password"
          />
          <Form
            name="forget-password"
            className={classNames(styles.forgetPassForm, styles.containerFluid)}
            initialValues={{
              remember: true,
            }}
          >
            {/* Email */}
            <Form.Item
              name="email"
              label="Type Your E-mail"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            {/* Button Block */}
            <Form.Item className={styles.antColRtl}>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.loginFormButton}
              >
                Email Me a recovery link
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ForgetPasswordForm;
