import classNames from "classnames";

import {
  Form,
  Input,
  Select,
  Checkbox,
  Button,
  Typography,
  Divider,
} from "antd";
import {
  FacebookFilled,
  GoogleSquareFilled,
  TwitterSquareFilled,
} from "@ant-design/icons";

import styles from "./RegistrationForm.module.css";
import Heading from "../heading/Heading";

const { Link } = Typography;
const { Option } = Select;

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
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="88">+88</Option>
      </Select>
    </Form.Item>
  );

  return (
    <>
      <div className={classNames(styles.bgColor, styles.block)}>
        <div className={styles.containerFluid}>
          <Heading
            headingStyle={styles.titleHolder}
            headingTitle="Create Your Account"
          />
          <Form
            {...formItemLayout}
            form={form}
            className={styles.containerFluid}
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
              name="fullname"
              label={<span>Fullname&nbsp;</span>}
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
                addonBefore={prefixSelector}
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

                    return Promise.reject(
                      "The two passwords that you entered do not match!"
                    );
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
                I have read the <Link href="#">agreement</Link>
              </Checkbox>
            </Form.Item>
            {/* Submit Button */}
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
          <Divider style={{ marginTop: "-10px" }}>Or Register Using </Divider>
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

export default RegistrationForm;
