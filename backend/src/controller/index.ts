export {
  userLogin as userLoginController,
  userRegistration as userRegistrationController,
  users as usersController,
  } from "./auth";

export {
  createProduct as createProductController,
  getAllProducts as getAllProductsController,
  getProduct as getProductController,
  updateProduct as updateProductController,
  deleteProduct as deleteProductController,
  uploadImage as uploadImageController
  } from "./products";

export{ 
  createBlog as createBlogController,
  getAllBlogs as getAllBlogsController,
  getSingleBlog as getSingleBlogController,
  updateSingleBlog as updateSingleBlogController,
  deleteBlog as deleteBlogController
} from "./blog";