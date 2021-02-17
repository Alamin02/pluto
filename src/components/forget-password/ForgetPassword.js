import classNames from "classnames";
import { Form, Input, Button, Typography } from 'antd';
import { Link } from "react-router-dom";

import styles from './ForgetPassword.module.css';
import Heading from "../heading/Heading";

const { Text } = Typography;

const ForgetPassword = () => {
  return (
    <>
      <div className={classNames(styles.bgColor, styles.block)}>
        <div className={styles.containerFluid}>
          <Heading
            headingStyle={styles.titleHolder}
            headingTitle="Recover Your Password"            
          />
          <div style={{ textAlign: 'center', marginBottom: '15px' }}>
            <Text>
              <span></span>Enter the email address associated with your account and we will send you a link to reset your password
            </Text>
          </div>
          <Form
            name="forget-password"
            className={classNames(styles.forgetPassForm, styles.containerFluid)}
            layout="vertical"
            initialValues={{
              remember: true,
            }}
          >
            {/* Email */}
            <Form.Item
              name="email"
              label="E-mail"
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
          <div style={{ textAlign: 'center' }}>
            <Text>
              Don't have an account ? <Link to="/registration">register now!</Link>
            </Text>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
