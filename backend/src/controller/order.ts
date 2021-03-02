import express = require('express');
import { getConnection } from 'typeorm';
import { validationResult } from 'express-validator';
import { Order } from '../entity';

// @POST - /api/v1/orders
// Create a order
export async function createOrder(req: express.Request, res: express.Response) {
  // Validation result
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { user, orderedProducts, status, paymentMethod } = req.body;

  // Save to database
  try {
    const orderRepository = getConnection().getRepository(Order);
    const newOrder = new Order();

    newOrder.user = user;
    newOrder.orderedProducts = orderedProducts;
    newOrder.status = status;
    newOrder.paymentMethod = paymentMethod;

    const order = await orderRepository.save(newOrder);
    return res.json({ newOrder: order });
  } catch (err) {
    res.json({ errors: 'Order could not be added' });
  }

  res.json({ msg: 'Order created' });
}

// @GET - /api/v1/order/
// Get All orders
export async function getAllOrders(
  req: express.Request,
  res: express.Response
) {
  const orderRepository = getConnection().getRepository(Order);

  const page = parseInt(<string>req.query.page);
  const perPage = parseInt(<string>req.query.perPage);

  const [orders, orderCount] = await orderRepository.findAndCount({
    select: ['id', 'status', 'paymentMethod'],
    relations: ['user', 'orderedProducts'],
    take: page * perPage,
    skip: (page - 1) * perPage,
  });

  res.json({
    data: {
      orders,
      orderCount,
      currentPage: page,
      maxPages: Math.ceil(orderCount / perPage),
      perPage,
    },
  });
}

// @GET - /api/v1/orders/:orderId
//  Get a order
export async function getSingleOrder(
  req: express.Request,
  res: express.Response
) {
  const id = req.params.blogId;
  const orderRepository = getConnection().getRepository(Order);
  const singleOrder = await orderRepository.findOne({ id });

  if (!singleOrder) {
    return res.status(400).json({ msg: 'Order is not found' });
  }
  res.json({ data: singleOrder });
}

// @PUT - /api/v1/orders/:orderId
// update a order
export async function updateSingleOrder(
  req: express.Request,
  res: express.Response
) {
  try {
    const { user, orderedProducts, status, paymentMethod } = req.body;
    const orderRepository = getConnection().getRepository(Order);
    const newOrder = new Order();

    newOrder.user = user;
    newOrder.orderedProducts = orderedProducts;
    newOrder.status = status;
    newOrder.paymentMethod = paymentMethod;

    await orderRepository.update({ id: req.params.blogId }, newOrder);
  } catch (err) {
    res.json({ errors: 'Order is not updated' });
  }
  res.json({ msg: 'Order is now updated' });
}

// @DELETE - /api/v1/orders/:orderId
// delete order
export async function deleteOrder(req: express.Request, res: express.Response) {
  const id = req.params.blogId;
  const orderRepository = getConnection().getRepository(Order);
  try {
    if (await orderRepository.delete({ id })) {
      return res.json({ msg: 'delete successfully' });
    }
  } catch (err) {
    res.json({ errors: 'Order is not identified' });
  }
}
