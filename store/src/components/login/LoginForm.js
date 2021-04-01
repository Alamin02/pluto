import classNames from "classnames";
import { Form, Input, Button, Checkbox, Divider, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  FacebookFilled,
  GoogleSquareFilled,
  TwitterSquareFilled,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

import styles from "./LoginForm.module.css";
import Heading from "../heading/Heading";

const Login = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    fetch("http://localhost:4000/api/v1/users/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then(({ token }) => {
        console.log(token)
        if (token) {
          localStorage.setItem("token", token);
          window.location.reload();
        } else {
          message.error("Could not login, check credentials");
        }
      });
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
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                type="email"
                placeholder="Email"
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
          <Divider style={{ marginTop: "-10px" }}>Or Login Using </Divider>
          <div className={styles.icon}>
            <Link to="#">
              <FacebookFilled style={{ color: "#08c" }} />
            </Link>
            <Link to="#">
              <GoogleSquareFilled style={{ color: "#db3236" }} />
            </Link>
            <Link to="#">
              <TwitterSquareFilled style={{ color: "#1da1f2" }} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
