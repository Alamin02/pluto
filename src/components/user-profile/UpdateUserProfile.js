import { Link } from "react-router-dom";

import { Form, Input, Button, Upload, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import styles from "./UpdateUserProfile.module.css";

import userInfo from "./userInfo";
import shippingAddressList from "./shippingAddressList";

const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}

function UpdateUserProfile() {
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
      offset: 1,
      span: 8,
    },
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.mainHeading}>Update my account</h1>

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
            <Input defaultValue={userInfo.email} disabled />
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
            <Input defaultValue={userInfo.name} />
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
            <Input defaultValue={userInfo.phone} />
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
              <Button icon={<UploadOutlined />}>Select file</Button>
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
            <Input.Password placeholder="Enter new password" />
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
            <Select defaultValue={userInfo.address} onChange={handleChange}>
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
