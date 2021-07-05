import { Router } from "express";
import {
  createOrderController,
  getAllOrdersController,
  getSingleOrderController,
  updateSingleOrderController,
  deleteOrderController,
} from "../controller";
import { authenticationMiddleware, validationMiddleware } from "../middleware";
import {
  createOrderSchema,
  updateOrderSchema,
} from "../validators/orders.validator";

const orderRouter = Router();

orderRouter
  .route("/")
  // @GET - baseUrl/orders
  .get(authenticationMiddleware, getAllOrdersController)
  // @POST - baseUrl/orders
  .post(
    authenticationMiddleware,
    validationMiddleware(createOrderSchema),
    createOrderController
  );

orderRouter
  .route("/:orderId")
  // @GET - baseUrl/orders/:orderId
  .get(authenticationMiddleware, getSingleOrderController)
  // @PUT - baseUrl/orders/:orderId
  .put(
    authenticationMiddleware,
    validationMiddleware(updateOrderSchema),
    updateSingleOrderController
  )
  // @DELETE - baseUrl/orders/:orderId
  .delete(authenticationMiddleware, deleteOrderController);

export default orderRouter;
