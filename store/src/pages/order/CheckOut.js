import React, { useState, useEffect } from "react";
import { Form, Input, Button, Grid } from "antd";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames";

import MainContainer from "../../components/layout/MainContainer";
import HeaderSection from "../../components/styled-components/HeaderSection";
import styles from "../../components/check-out/CheckOut.module.css";
import Section from "../../components/styled-components/Section";
import { agent } from "../../helpers/agent";
import Cart from "../../pages/order/Cart";

const { useBreakpoint } = Grid;

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

export default function CheckOut() {
  const [form] = Form.useForm();

  const [totalPrice, setTotalPrice] = useState(0);
  const [user, setUser] = useState("");
  const token = useSelector((state) => state.auth.tokenValue);
  const productList = useSelector((state) => state.cart.products);

  const screens = useBreakpoint();

  // on form submit
  const onFinish = (values) => {
    console.log("values: ", values);

    const order = {
      ...values,
      user: {
        id: values.user,
      },
    };

    agent
      .createOrder(order, token)
      .then((res) => res.json())
      .then(() => form.validateFields())
      .catch((error) => {
        console.log("Error while creating order.", error);
      });
  };

  useEffect(() => {
    let price = 0;
    productList.forEach((product) => {
      price += product.price * product.quantity;
    });
    setTotalPrice(price);

    if (token)
      agent
        .getMe(token)
        .then((res) => res.json())
        .then(({ data, error }) => {
          if (error) {
            localStorage.removeItem("token");
          }
          setUser(data);
        });
    form.resetFields();
  }, [token, totalPrice, productList, form, user.id]);

  if (!productList.length) {
    return (
      <MainContainer>
        <div
          style={{
            textAlign: "center",
            margin: "5rem 0",
          }}
        >
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
        <Cart />
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
        <Section heading="payment info">
          {/* user id */}
          <Form.Item
            {...tailLayout}
            hidden={true}
            name="user"
            label="User"
            initialValue={user.id}
          >
            <Input
              readOnly
              className={classNames(
                { [styles.inputStyle]: screens },
                { [styles.inputStyleXs]: screens.xs }
              )}
            />
          </Form.Item>
          {/* product list */}
          <Form.Item
            {...tailLayout}
            hidden={true}
            name="orderedProducts"
            label="Ordered products"
            initialValue={productList}
          >
            <Input
              readOnly
              className={classNames(
                { [styles.inputStyle]: screens },
                { [styles.inputStyleXs]: screens.xs }
              )}
            />
          </Form.Item>
          {/* payment method */}
          <Form.Item
            {...tailLayout}
            name="paymentMethod"
            label="Payment method"
            rules={[
              {
                required: true,
                message: "Please input your payment method!",
              },
            ]}
          >
            <Input
              className={classNames(
                { [styles.inputStyle]: screens },
                { [styles.inputStyleXs]: screens.xs }
              )}
            />
          </Form.Item>
        </Section>

        <div className={styles.emptySpace}></div>

        {/* submit button */}
        <Form.Item className={styles.buttonSection}>
          <div className={styles.buttonSection}>
            <Button type="primary" htmlType="submit">
              Add order
            </Button>
          </div>
        </Form.Item>
      </Form>
    </MainContainer>
  );
}
