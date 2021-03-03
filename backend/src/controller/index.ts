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
  uploadProductImage as uploadProductImageController,
} from "./products";

export {
  createBlog as createBlogController,
  getAllBlogs as getAllBlogsController,
  getSingleBlog as getSingleBlogController,
  updateSingleBlog as updateSingleBlogController,
  deleteBlog as deleteBlogController,
} from "./blog";

export {
  category as categoryController,
  createCategory as createCategoryController,
  createSubCategory as createSubCategoryController,
  updateCategory as updateCategoryController,
  updateSubCategory as updateSubCategoryController,
  deleteCategory as deleteCategoryController,
} from "./category";

export {
  getAllOffers as getAllOffersController,
  createOffer as createOfferController,
  updateOffer as updateOfferController,
  deleteOffer as deleteOfferController,
} from "./offer";

export {
  createOrder as createOrderController,
  getAllOrders as getAllOrdersController,
  getSingleOrder as getSingleOrderController,
  updateSingleOrder as updateSingleOrderController,
  deleteOrder as deleteOrderController,
} from "./order";

export {
  createAddress as createAddressController,
  getAllAddresses as getAllAddressesController,
  getAddress as getAddressController,
  updateAddress as updateAddressController,
  deleteAddress as deleteAddressController,
} from "./addresses";
