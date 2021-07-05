import express = require("express");
import { getConnection } from "typeorm";
import { Order, OrderedProduct } from "../entity";

// @POST - baseUrl/orders
// Create a order
export async function createOrder(req: express.Request, res: express.Response) {
  try {
    const { user, orderedProducts, paymentMethod, address } = req.body;
    const orderRepository = getConnection().getRepository(Order);
    const orderedProductRepository =
      getConnection().getRepository(OrderedProduct);

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
    newOrder.address = address;

    await orderRepository.save(newOrder);
    res.status(200).json({ success: true, message: "New order created!" });
  } catch (e) {
    return res.status(500).json({
      success: false,
      error: "Something went wrong",
    });
  }
}

// @GET - baseUrl/orders
// Get All orders
export async function getAllOrders(
  req: express.Request,
  res: express.Response
) {
  try {
    const orderRepository = getConnection().getRepository(Order);

    const page = parseInt(<string>req.query.page);
    const perPage = parseInt(<string>req.query.perPage);

    const { id, role } = res.locals.user;
    const [orders, orderCount] = await orderRepository.findAndCount({
      select: ["id", "status", "paymentMethod"],
      relations: [
        "user",
        "orderedProducts",
        "orderedProducts.product",
        "address",
      ],
      ...(role === "admin"
        ? {}
        : {
            where: {
              user: {
                id: id,
              },
            },
          }),
      take: page * perPage,
      skip: (page - 1) * perPage,
    });

    res.status(200).json({
      success: true,
      data: {
        orders,
        orderCount,
        currentPage: page,
        maxPages: Math.ceil(orderCount / perPage),
        perPage,
      },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      error: "Something went wrong!",
    });
  }
}

// @GET - /api/v1/orders/:orderId
//  Get a order
export async function getSingleOrder(
  req: express.Request,
  res: express.Response
) {
  try {
    const id = req.params.orderId;
    const orderRepository = getConnection().getRepository(Order);
    const singleOrder = await orderRepository.findOne({
      select: ["id", "status", "paymentMethod"],
      relations: ["user", "orderedProducts", "orderedProducts.product"],
      where: [{ id: id }],
    });

    if (!singleOrder) {
      return res.status(400).json({ success: false, error: "Order not found" });
    }
    res.status(200).json({ success: true, data: singleOrder });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      error: "Something went wrong!",
    });
  }
}

// @PUT - baseUrl/orders/:orderId
// update a order
export async function updateSingleOrder(
  req: express.Request,
  res: express.Response
) {
  try {
    const { user, orderedProducts, status, paymentMethod } = req.body;
    const id = req.params.orderId;

    const orderRepository = getConnection().getRepository(Order);
    const orderedProductRepository =
      getConnection().getRepository(OrderedProduct);

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
    res.status(200).json({ success: true, message: "Order is now updated" });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      error: "Something went wrong!",
    });
  }
}

// @DELETE - baseUrl/orders/:orderId
// delete order
export async function deleteOrder(req: express.Request, res: express.Response) {
  try {
    const id = req.params.orderId;
    const orderRepository = getConnection().getRepository(Order);

    if (await orderRepository.delete({ id })) {
      return res
        .status(200)
        .json({ success: true, message: "Order deleted successfully" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      error: "Something went wrong!",
    });
  }
}
