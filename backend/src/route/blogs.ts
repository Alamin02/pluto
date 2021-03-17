import express = require("express");
import { body } from "express-validator";
import {
  createBlogController,
  getAllBlogsController,
  getSingleBlogController,
  updateSingleBlogController,
  deleteBlogController,
} from "../controller";
import { authenticationMiddleware, imageUpload } from "../middleware";

const router = express.Router();

// Get all blogs list
router.get("/", getAllBlogsController);

// Create a blog
router.post(
  "/",
  imageUpload.single("blogImage"),
  authenticationMiddleware,
  [
    body("title").not().isEmpty().withMessage("Blog title must not be empty"),
    body("author").not().isEmpty().withMessage("Author can not be empty"),
    body("description")
      .not()
      .isEmpty()
      .withMessage("Blog description can not be empty"),
  ],
  createBlogController
);

// Get a particular blog
router.get("/:blogId", getSingleBlogController);

// Update blog
router.put(
  "/:blogId",
  authenticationMiddleware,
  [
    body("title").not().isEmpty().withMessage("Blog title must not be empty"),
    body("author").not().isEmpty().withMessage("Author can not be empty"),
    body("description")
      .not()
      .isEmpty()
      .withMessage("Blog description can not be empty"),
  ],
  updateSingleBlogController
);

// Delete blog
router.delete("/:blogId", authenticationMiddleware, deleteBlogController);

export default router;
