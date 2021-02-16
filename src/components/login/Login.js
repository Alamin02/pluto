import classNames from "classnames";
import { Form, Input, Button, Checkbox, Divider } from "antd";
import {
  UserOutlined,
  LockOutlined,
  FacebookFilled,
  GoogleSquareFilled,
  TwitterSquareFilled,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

import styles from "./Login.module.css";
import Heading from "../heading/Heading";

const Login = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    <>
      <div className={classNames(styles.bgColor, styles.block)}>
        <div className={styles.containerFluid}>
          <Heading
            headingStyle={styles.titleHolder}
            headingTitle="Log Into Your Account"
          />
          <Form
            name="normal_login"
            className={classNames(styles.loginForm, styles.containerFluid)}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            {/* Username */}
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            {/* Password */}
            <Form.Item
              name="password"
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
            {/* "Remember me" Block  */}
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Link className={styles.loginFormForgot} to="/forgetPassword">
                Forgot password ?
              </Link>
            </Form.Item>
            {/* Button Block */}
            <Form.Item className={styles.antColRtl}>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.loginFormButton}
              >
                Log in
              </Button>
              Or <Link to="/registration">register now!</Link>
            </Form.Item>
          </Form>
          <Divider>Or</Divider>
          <div className={styles.icon}>
            <FacebookFilled style={{ color: "#08c" }} />
            <GoogleSquareFilled style={{ color: "#db3236" }} />
            <TwitterSquareFilled style={{ color: "#1da1f2" }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
