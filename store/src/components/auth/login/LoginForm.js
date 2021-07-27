import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Form, Input, Button, Checkbox, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import styles from "./LoginForm.module.css";
import MainContainer from "../../layout/MainContainer";
import HeaderSection from "../../styled-components/HeaderSection";
import { login } from "../../../client/auth.client";

const Login = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  let location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const onFinish = (values) => {
    login(values)
      .then((res) => res.json())
      .then(({ success, error, message: msg, token }) => {
        if (token) {
          localStorage.setItem("token", token);
          dispatch({ type: "auth/login", payload: token });
          message.success(msg);
          form.resetFields();
          history.replace(from);
        } else {
          message.error(error);
        }
      });
  };
  return (
    <MainContainer>
      <div>
        <div style={{ textAlign: "center" }}>
          <HeaderSection headerText="Log in" />
        </div>
        <Form
          // name="normal_login"
          form={form}
          className={styles.loginForm}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          {/* email */}
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
              prefix={<MailOutlined style={{ color: "gray" }} />}
              type="email"
              placeholder="Email"
            />
          </Form.Item>

          {/* password */}
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
              prefix={<LockOutlined style={{ color: "gray" }} />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          {/* remember me / forgot pwd */}
          <Form.Item>
            <div className={styles.rememberSection}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <Link to="/forgetPassword">Forgot password?</Link>
            </div>
          </Form.Item>

          {/* submit button*/}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.loginButton}
            >
              Login
            </Button>
          </Form.Item>

          {/* register */}
          <div className={styles.center}>
            or <Link to="/registration">register</Link>
          </div>
        </Form>
      </div>
    </MainContainer>
  );
};

export default Login;
