import { Router } from "express";

import {
  createProductController,
  getAllProductsController,
  getProductController,
  updateProductController,
  deleteProductController,
} from "../controller";

import {
  authenticationMiddleware,
  imageUpload,
  validationMiddleware,
} from "../middleware";

import {
  createProductSchema,
  updateProductSchema,
} from "../validators/products.validator";

const productRouter = Router();

productRouter
  .route("/")
  .get(getAllProductsController)
  .post(
    authenticationMiddleware,
    imageUpload.array("productImages", 4),
    validationMiddleware(createProductSchema),
    createProductController
  );

productRouter
  .route("/:productId")
  .get(getProductController)
  .put(
    validationMiddleware(updateProductSchema),
    authenticationMiddleware,
    updateProductController
  )
  .delete(authenticationMiddleware, deleteProductController);

export default productRouter;
