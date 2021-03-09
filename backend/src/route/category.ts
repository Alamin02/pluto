import express = require("express");
const router = express.Router();
import { body } from "express-validator";
import {
  categoryController,
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
} from "../controller";
router.get("/", categoryController);

router.post(
  "/",
  [body("name").not().isEmpty().withMessage("name must not be empty")],
  createCategoryController
);

router.put("/:categoryId", updateCategoryController);

router.delete("/:categoryId", deleteCategoryController);

export default router;
