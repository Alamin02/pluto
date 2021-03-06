import { getConnection } from "typeorm";
import { Order } from "../entity";

const orderList = [
  {
    status: "abc",
    paymentMethod: "xyz",
  },
];

export async function seedOrders() {
  const orderRepository = getConnection().getRepository(Order);

  for (const order of orderList) {
    const newOrder = new Order();

    newOrder.status = order.status;
    newOrder.paymentMethod = order.paymentMethod;

    await orderRepository.save(newOrder);
  }
}
