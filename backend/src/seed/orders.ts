import express from "express";
import { getConnection } from "typeorm";
import { Order, OrderedProduct } from "../entity";

const ordersList = [
  {
    status: "Active",
    paymentMethod: "bikash",
  },
  {
    status: "Active",
    paymentMethod: "DBBL",
  },
  {
    status: "Active",
    paymentMethod: "bikash",
  },
  {
    status: "Active",
    paymentMethod: "bikash",
  },
  {
    status: "Active",
    paymentMethod: "bikash",
  },
  {
    status: "Active",
    paymentMethod: "bikash",
  },
  {
    status: "Active",
    paymentMethod: "bikash",
  },
  {
    status: "Active",
    paymentMethod: "bikash",
  },
  {
    status: "Active",
    paymentMethod: "bikash",
  },
  {
    status: "Inactive",
    paymentMethod: "bikash",
  },
];

export async function seedOrders() {
  const orderRepository = getConnection().getRepository(Order);

  for (const order of ordersList) {
    const newOrder = new Order();

    newOrder.status = order.status;
    newOrder.paymentMethod = order.paymentMethod;

    await orderRepository.save(newOrder);
  }
}
