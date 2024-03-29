import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, Modal, Radio, message } from "antd";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { ExclamationCircleOutlined, PlusOutlined } from "@ant-design/icons";

import MainContainer from "../../components/layout/MainContainer";
import HeaderSection from "../../components/styled-components/HeaderSection";
import styles from "./CheckOut.module.css";
import Section from "../../components/styled-components/Section";

import OrderedProducts from "../../components/check-out/OrderedProducts";
import CreateNewAddressModal from "../../components/address/CreateNewAddressModal";

import { getUserAddress } from "../../client/address.client";
import { createOrder } from "../../client/orders.client";
import { getMe } from "../../client/auth.client";

const { Option } = Select;

const layout = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 2,
  },
};

const tailLayout = {
  labelCol: { span: 3 },
  wrapperCol: {
    span: 8,
    offset: 1,
  },
};

export default function CheckOut() {
  const history = useHistory();
  const [form] = Form.useForm();

  const [user, setUser] = useState("");
  const token = useSelector((state) => state.auth.tokenValue);
  const productList = useSelector((state) => state.cart.products);
  const [visibleCreateModal, setVisibleCreateModal] = useState(false);
  const [userAddress, setUserAddress] = useState([]);

  const fetchAddresses = (token) => {
    getUserAddress(token)
      .then((res) => res.json())
      .then(({ data }) => setUserAddress(data));
  };

  useEffect(() => {
    fetchAddresses(token);
  }, [token]);

  const onCreateAddress = () => {
    setVisibleCreateModal(false);
    fetchAddresses(token);
  };

  // on form submit
  const onFinish = (values) => {
    const newOrderedProducts = [];
    for (const orderedProduct of productList) {
      newOrderedProducts.push({
        product: { id: orderedProduct.id },
        quantity: orderedProduct.quantity,
      });
    }

    const order = {
      ...values,
      user: { id: user.id },
      orderedProducts: newOrderedProducts,
      // address: {
      //   id: values.shippingAddress,
      // },
    };

    createOrder(order, token)
      .then((res) => res.json())
      .then(({ success, error }) => {
        if (success) {
          Modal.success({
            visible: true,
            title: "Success",
            icon: <ExclamationCircleOutlined />,
            content: "Your order has been placed.",
            okText: "See your orders",
            cancelText: "Cancel",
            onOk() {
              history.push("/profile");
            },
          });
        } else {
          message.error(error);
        }
      })
      .catch((error) => {
        console.log("Error while creating order.", error);
      });
  };

  useEffect(() => {
    if (token)
      getMe(token)
        .then((res) => res.json())
        .then(({ data, success }) => {
          if (!success) {
            localStorage.removeItem("token");
          }
          setUser(data);
        });
    form.resetFields();
  }, [token, form, productList]);

  if (!productList.length) {
    return (
      <MainContainer>
        <div className={styles.emptyCart}>
          <Link to="/">Start shopping</Link>&nbsp;& then you will see your
          orders
        </div>
      </MainContainer>
    );
  }
  return (
    <MainContainer>
      <HeaderSection headerText="check out" />

      <Section heading="user info">
        <div {...tailLayout} label="User name">
          You are logged in as&nbsp;
          <Link to="/profile">{user.email}</Link>
        </div>
      </Section>

      <div className={styles.emptySpace}></div>

      <Section heading="Your orders">
        <OrderedProducts />
        <Link to="/cart">
          <Button type="primary" className={styles.cartButton}>
            Go to cart
          </Button>
        </Link>
      </Section>

      {/* FORM */}
      <Form
        name="checkout_form"
        form={form}
        onFinish={onFinish}
        {...layout}
        initialValues={{
          remember: true,
        }}
      >
        <div className={styles.emptySpace}></div>

        {/* user id */}
        <Form.Item
          {...tailLayout}
          hidden={true}
          name="user"
          label="User"
          initialValue={user.id}
        >
          <Input readOnly />
        </Form.Item>
        {/* product list */}
        <Form.Item
          {...tailLayout}
          hidden={true}
          name="orderedProducts"
          label="Ordered products"
          initialValue={productList}
        >
          <Input readOnly />
        </Form.Item>

        {/* payment method */}
        <Section heading="shipping info">
          <Form.Item
            {...tailLayout}
            name="address"
            label="Address"
            rules={[
              {
                required: true,
                message: "You must choose a shipping address!",
              },
            ]}
          >
            {userAddress.length === 0 ? (
              <div>You currently have no shipping addresses.</div>
            ) : (
              <Radio.Group>
                {userAddress.map((address) => (
                  <div>
                    <Radio
                      style={{ marginBottom: "0.5rem" }}
                      value={address.id}
                    >
                      {address.address}
                    </Radio>
                    <br />
                  </div>
                ))}
              </Radio.Group>
            )}
          </Form.Item>

          <Button
            type="primary"
            style={{ textTransform: "capitalize" }}
            icon={<PlusOutlined />}
            onClick={() => {
              setVisibleCreateModal(true);
            }}
          >
            add new address
          </Button>

          <CreateNewAddressModal
            visible={visibleCreateModal}
            onCreate={onCreateAddress}
            onCancel={() => {
              setVisibleCreateModal(false);
            }}
            userId={user.id}
          />
        </Section>
        <div className={styles.emptySpace}></div>

        {/* payment method */}
        <Section heading="payment info">
          <Form.Item
            {...tailLayout}
            name="paymentMethod"
            label="Payment method"
            rules={[
              {
                required: true,
                message: "You must choose a payment method!",
              },
            ]}
          >
            <Select
              placeholder="Select payment method"
              allowClear
              style={{ width: 300 }}
            >
              <Option value="dogecoin">Dogecoin</Option>
              <Option value="bkash">bKash</Option>
              <Option value="rocket">Rocket</Option>
            </Select>
          </Form.Item>
        </Section>
        <div className={styles.emptySpace}></div>

        {/* submit button */}
        <Form.Item className={styles.buttonSection}>
          <div className={styles.buttonSection}>
            <Button type="primary" htmlType="submit">
              Confirm order
            </Button>
          </div>
        </Form.Item>
      </Form>
    </MainContainer>
  );
}
