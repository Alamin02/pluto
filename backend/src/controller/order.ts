import express = require("express");
import { getConnection } from "typeorm";
import { validationResult } from "express-validator";
import { Order, OrderedProduct } from "../entity";

// @POST - /api/v1/orders
// Create a order
export async function createOrder(req: express.Request, res: express.Response) {
  // Validation result
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { user, orderedProducts, paymentMethod } = req.body;

  // Save to database
  try {
    const orderRepository = getConnection().getRepository(Order);
    const orderedProductRepository = getConnection().getRepository(
      OrderedProduct
    );

    const createdOrderedProducts = [];

    for (const orderedProduct of orderedProducts) {
      const newOrderedProduct = new OrderedProduct();
      newOrderedProduct.product = orderedProduct.product;
      newOrderedProduct.quantity = orderedProduct.quantity;

      const savedOrderedProduct = await orderedProductRepository.save(
        newOrderedProduct
      );
      createdOrderedProducts.push(savedOrderedProduct);
    }

    const newOrder = new Order();

    newOrder.user = user;
    newOrder.orderedProducts = createdOrderedProducts;
    newOrder.status = "order placed";
    newOrder.paymentMethod = paymentMethod;

    await orderRepository.save(newOrder);
  } catch (err) {
    return res.status(400).json({
      msg: "Order could not be added",
      error: err,
    });
  }

  res.json({ msg: "Order created" });
}

// @GET - /api/v1/order/
// Get All orders
export async function getAllOrders(
  req: express.Request,
  res: express.Response
) {
  // const userId = req.params.userId;
  const orderRepository = getConnection().getRepository(Order);

  const page = parseInt(<string>req.query.page);
  const perPage = parseInt(<string>req.query.perPage);

  const [orders, orderCount] = await orderRepository.findAndCount({
    select: ["id", "status", "paymentMethod"],
    relations: ["user", "orderedProducts", "orderedProducts.product"],
    where: {
      user: {
        id: res.locals.user.id,
      },
    },
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
  const id = req.params.orderId;
  const orderRepository = getConnection().getRepository(Order);
  const singleOrder = await orderRepository.findOne({
    select: ["id", "status", "paymentMethod"],
    relations: ["user", "orderedProducts", "orderedProducts.product"],
    where: [{ id: id }],
  });

  if (!singleOrder) {
    return res.status(400).json({ msg: "Order is not found" });
  }
  res.json({ data: singleOrder });
}

// @PUT - /api/v1/orders/:orderId
// update a order
export async function updateSingleOrder(
  req: express.Request,
  res: express.Response
) {
  const { user, orderedProducts, status, paymentMethod } = req.body;
  const id = req.params.orderId;

  try {
    const orderRepository = getConnection().getRepository(Order);
    const orderedProductRepository = getConnection().getRepository(
      OrderedProduct
    );

    const createdOrderedProducts = [];

    for (const orderedProduct of orderedProducts) {
      const newOrderedProduct = new OrderedProduct();
      newOrderedProduct.product = orderedProduct.product;
      newOrderedProduct.quantity = orderedProduct.quantity;

      const savedOrderedProduct = await orderedProductRepository.save(
        newOrderedProduct
      );
      createdOrderedProducts.push(savedOrderedProduct);
    }

    const newOrder = new Order();

    newOrder.user = user;
    newOrder.orderedProducts = createdOrderedProducts;
    newOrder.status = status;
    newOrder.paymentMethod = paymentMethod;

    const findOrderById: any = await orderRepository.findOne({ id });
    await orderRepository.update(findOrderById, newOrder);
  } catch (err) {
    res.json({ errors: "Order is not updated" });
  }
  res.json({ msg: "Order is now updated" });
}

// @DELETE - /api/v1/orders/:orderId
// delete order
export async function deleteOrder(req: express.Request, res: express.Response) {
  const id = req.params.orderId;
  const orderRepository = getConnection().getRepository(Order);

  try {
    if (await orderRepository.delete({ id })) {
      return res.json({ msg: "delete successfully" });
    }
  } catch (err) {
    res.json({ errors: "Order is not identified" });
  }
}
