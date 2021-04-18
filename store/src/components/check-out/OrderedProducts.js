import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { Table, Tag } from "antd";

const columns = [
  {
    title: "Product name",
    dataIndex: "name",
    key: "name",
    render: (name) => <>{name}</>,
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
    render: (quantity) => (
      <>
        <Tag color="geekblue">{quantity}</Tag>
      </>
    ),
  },
  {
    title: "Price (per piece)",
    dataIndex: "price",
    key: "price",
    render: (price) => <>{price} BDT</>,
  },
];

export default function OrderedProducts() {
  const [totalPrice, setTotalPrice] = useState(0);
  const productList = useSelector((state) => state.cart.products);

  useEffect(() => {
    let price = 0;
    productList.forEach((product) => {
      price += product.price * product.quantity;
    });
    setTotalPrice(price);
  }, [productList, totalPrice, setTotalPrice]);

  return (
    <div>
      <Table
        pagination={false}
        columns={columns}
        dataSource={productList}
        footer={() => `Total price: ${totalPrice} BDT`}
      />
    </div>
  );
}
