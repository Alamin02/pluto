import { Link } from "react-router-dom";
import { Form, Input, Button, Upload, Select, Grid } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import classNames from "classnames";

import styles from "./UpdateUserProfile.module.css";

import userInfo from "../components/user-profile/userInfo";
import shippingAddressList from "../components/user-profile/shippingAddressList";
import HeaderSection from "../components/styled-components/HeaderSection"

const { Option } = Select;
const { useBreakpoint } = Grid;

function handleChange(value) {
  console.log(`selected ${value}`);
}

function UpdateUserProfile() {
  const screens = useBreakpoint();

  const layout = {
    labelCol: {
      span: 3,
    },
    wrapperCol: {
      span: 2,
    },
  };

  const tailLayout = {
    wrapperCol: {
      span: 8,
    },
  };

  return (
    <div className={styles.container}>
      {/* <h1 className={styles.mainHeading}>Update my account</h1> */}
      <HeaderSection headerText="update my profile" />

      <Form
        {...layout}
        initialValues={{
          remember: true,
        }}
      >
        {/* 1st section start */}
        <section className={styles.eachSection}>
          <h2 className={styles.eachSectionTitle}>Update basic info</h2>
          {/* email */}
          <Form.Item
            {...tailLayout}
            label="Email"
            name="email"
            rules={[
              {
                required: false,
                message: "Please input your email!",
              },
            ]}
          >
            <Input
              defaultValue={userInfo.email}
              disabled
              className={classNames(
                { [styles.inputStyle]: screens },
                { [styles.inputStyleXs]: screens.xs }
              )}
            />
          </Form.Item>

          {/* name */}
          <Form.Item
            {...tailLayout}
            label="Name"
            name="name"
            rules={[
              {
                required: false,
                message: "Please input your name!",
              },
            ]}
          >
            <Input
              defaultValue={userInfo.name}
              className={classNames(
                { [styles.inputStyle]: screens },
                { [styles.inputStyleXs]: screens.xs }
              )}
            />
          </Form.Item>

          {/* phone */}
          <Form.Item
            {...tailLayout}
            label="Phone number"
            name="phone"
            rules={[
              {
                required: false,
                message: "Please input your phone number!",
              },
            ]}
          >
            <Input
              defaultValue={userInfo.phone}
              className={classNames(
                { [styles.inputStyle]: screens },
                { [styles.inputStyleXs]: screens.xs }
              )}
            />
          </Form.Item>

          {/* image */}
          <Form.Item
            {...tailLayout}
            label="Photo"
            name="photo"
            rules={[
              {
                required: false,
                message: "Please select photo!",
              },
            ]}
          >
            <Upload>
              <Button
                icon={<UploadOutlined />}
                className={classNames(
                  { [styles.inputStyle]: screens },
                  { [styles.inputStyleXs]: screens.xs }
                )}
              >
                Select file
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item
            {...tailLayout}
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              placeholder="Enter new password"
              className={classNames(
                { [styles.inputStyle]: screens },
                { [styles.inputStyleXs]: screens.xs }
              )}
            />
          </Form.Item>
        </section>
        {/* 1st section end */}

        <section className={styles.emptySpace}></section>

        {/* 2nd section start */}
        <section className={styles.eachSection} key={userInfo.key}>
          <h2 className={styles.eachSectionTitle}>Update shipping address</h2>
          {/* address */}
          <Form.Item
            {...tailLayout}
            label="Address"
            name="address"
            rules={[
              {
                required: false,
                message: "Please input your name!",
              },
            ]}
          >
            {/* <Input /> */}
            <Select
              defaultValue={userInfo.address}
              className={classNames(
                { [styles.inputStyle]: screens },
                { [styles.inputStyleXs]: screens.xs }
              )}
              onChange={handleChange}
            >
              {shippingAddressList.map((address) => (
                <Option value={address.address} key={address.id}>
                  {address.address}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </section>
        {/* 2nd section end */}

        <Form.Item className={styles.buttonSection}>
          <Link to="/profile">
            <Button type="primary" htmlType="submit">
              Save changes
            </Button>
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
}

export default UpdateUserProfile;
