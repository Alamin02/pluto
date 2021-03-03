import express = require("express");
const router = express.Router();
import { body } from "express-validator";
import {
  categoryController,
  createCategoryController,
  createSubCategoryController,
  updateCategoryController,
  updateSubCategoryController,
  deleteCategoryController,
} from "../controller";
router.get("/", categoryController);

router.post(
  "/",
  [body("name").not().isEmpty().withMessage("name must not be empty")],
  createCategoryController
);
router.post(
  "/sub",
  [
    body("name").not().isEmpty().withMessage("name must not be empty"),
    body("parentId").not().isEmpty().withMessage("parent must not be empty"),
  ],
  createSubCategoryController
);
router.put("/:categoryId", updateCategoryController);
router.put("/sub/:subCategoryId", updateSubCategoryController);

router.delete("/:categoryId", deleteCategoryController);

export default router;
