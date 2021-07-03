import express = require("express");
const categoryRouter = express.Router();
import {
  getCategoryController,
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
  getSingleCategoryController,
} from "../controller";

import { authenticationMiddleware, validationMiddleware } from "../middleware";

import {
  createCategorySchema,
  updateCategorySchema,
} from "../validators/category.validator";

// get all category
// create category
categoryRouter
  .route("/")
  .get(getCategoryController)
  .post(
    authenticationMiddleware,
    validationMiddleware(createCategorySchema),
    createCategoryController
  );

// get a single category
// update a category
// delete a category
categoryRouter
  .route("/:categoryId")
  .get(getSingleCategoryController)
  .put(
    authenticationMiddleware,
    validationMiddleware(updateCategorySchema),
    updateCategoryController
  )
  .delete(deleteCategoryController);

export default categoryRouter;
