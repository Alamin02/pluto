import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Form, Input, Checkbox, Button, Typography, message } from "antd";

import MainContainer from "../layout/MainContainer";
import HeaderSection from "../styled-components/HeaderSection";
import styles from "./RegistrationForm.module.css";

const { Link } = Typography;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const RegistrationForm = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const onFinish = (values) => {
    values.role = "user";
    fetch("http://localhost:4000/api/v1/users/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then(({ token }) => {
        if (token) {
          localStorage.setItem("token", token);
          dispatch({ type: "auth/login", payload: token });
          message.success("New account has been created");
          form.resetFields();
          history.push("/");
        } else {
          message.error("Account with similar email already exists");
        }
      });
  };

  return (
    <MainContainer>
      <div style={{ textAlign: "center" }}>
        <HeaderSection headerText="Create account" />
      </div>
      <Form
        {...formItemLayout}
        form={form}
        className={styles.registerForm}
        name="register"
        labelAlign="left"
        onFinish={onFinish}
        initialValues={{
          prefix: "88",
        }}
        scrollToFirstError
      >
        {/* Username */}
        <Form.Item
          name="name"
          label={<span>Full name&nbsp;</span>}
          rules={[
            {
              required: true,
              message: "Please input your fullname!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
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
        {/* Phone */}
        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
          ]}
        >
          <Input
            style={{
              width: "100%",
            }}
          />
        </Form.Item>
        {/* Password */}
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        {/* Confirm Password */}
        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject("Password does not match!");
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        {/* Agreement */}
        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject("Should accept agreement"),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            I have read the <Link href="#">agreement.</Link>
          </Checkbox>
        </Form.Item>

        {/* Submit Button */}
        <Form.Item {...tailFormItemLayout} style={{ marginBottom: "0" }}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </MainContainer>
  );
};

export default RegistrationForm;
