import express = require("express");
const router = express.Router();
import { body } from "express-validator";
import {
  categoryController,
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
  getSingleCategoryController,
} from "../controller";
import { authenticationMiddleware } from "../middleware";
router.get("/", categoryController);

router.post(
  "/",
  authenticationMiddleware,
  [body("name").not().isEmpty().withMessage("Category name must not be empty")],
  createCategoryController
);

router.put(
  "/:categoryId",
  authenticationMiddleware,
  [body("name").not().isEmpty().withMessage("Category name must not be empty")],
  updateCategoryController
);

router.delete(
  "/:categoryId",
  authenticationMiddleware,
  deleteCategoryController
);

router.get("/:categoryId", getSingleCategoryController);

export default router;
