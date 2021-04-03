import { getAllProductsImages, getSingleImage } from "./productImage";

export {
  userLogin as userLoginController,
  userRegistration as userRegistrationController,
  users as usersController,
  getUser as getUserController,
  updateUser as updateUserController,
  deleteUser as deleteUserController,
} from "./auth";

export {
  createProduct as createProductController,
  getAllProducts as getAllProductsController,
  getProduct as getProductController,
  updateProduct as updateProductController,
  deleteProduct as deleteProductController,
} from "./products";

export {
  createBlog as createBlogController,
  getAllBlogs as getAllBlogsController,
  getSingleBlog as getSingleBlogController,
  updateSingleBlog as updateSingleBlogController,
  deleleBlogImage as deleleBlogImageController,
  deleteBlog as deleteBlogController,
} from "./blog";

export {
  category as categoryController,
  createCategory as createCategoryController,
  updateCategory as updateCategoryController,
  deleteCategory as deleteCategoryController,
  getSingleCategory as getSingleCategoryController,
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

export {
  getAllProductsImages as getAllProductsImagesController,
  getSingleImage as getSingleImageController,
  deleteProductImage as deleteProductImageController,
  createProductImage as createProductImageController,
} from "./productImage";
