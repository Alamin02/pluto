import express = require("express");
import {
  createBlogController,
  getAllBlogsController,
  getSingleBlogController,
  updateSingleBlogController,
  deleleBlogImageController,
  deleteBlogController,
} from "../controller";

import {
  authenticationMiddleware,
  imageUpload,
  validationMiddleware,
} from "../middleware";

import {
  createBlogSchema,
  updateBlogSchema,
} from "../validators/blogs.validator";

const blogRouter = express.Router();

// Get all blogs list
blogRouter
  .route("/")
  .get(getAllBlogsController)
  .post(
    authenticationMiddleware,
    imageUpload.single("blogImage"),
    validationMiddleware(createBlogSchema),
    createBlogController
  );

// Get a particular blog
blogRouter
  .route("/:blogId")
  .get(getSingleBlogController)
  .put(
    authenticationMiddleware,
    imageUpload.single("blogImage"),
    validationMiddleware(updateBlogSchema),
    updateSingleBlogController
  )
  .delete(authenticationMiddleware, deleteBlogController);

blogRouter.delete("/blogImage/:blogId", deleleBlogImageController);

export default blogRouter;
