export {
  userLogin as userLoginController,
  userRegistration as userRegistrationController,
} from "./auth.controller";

export {
  createUser as createUserController,
  getUsers as getUsersController,
  getUser as getUserController,
  deleteUser as deleteUserController,
  updateUserPassword as updateUserPasswordController,
  updateUser as updateUserController,
} from "./users.controller";

export {
  createProduct as createProductController,
  getAllProducts as getAllProductsController,
  getProduct as getProductController,
  updateProduct as updateProductController,
  deleteProduct as deleteProductController,
} from "./products.controller";

export {
  createBlog as createBlogController,
  getAllBlogs as getAllBlogsController,
  getSingleBlog as getSingleBlogController,
  updateSingleBlog as updateSingleBlogController,
  deleleBlogImage as deleleBlogImageController,
  deleteBlog as deleteBlogController,
} from "./blogs.controller";

export {
  getCategory as getCategoryController,
  createCategory as createCategoryController,
  updateCategory as updateCategoryController,
  deleteCategory as deleteCategoryController,
  getSingleCategory as getSingleCategoryController,
} from "./category.controller";

export {
  getAllOffers as getAllOffersController,
  getSingleOffer as getSingleOfferController,
  createOffer as createOfferController,
  updateOffer as updateOfferController,
  deleteOffer as deleteOfferController,
} from "./offers.controller";

export {
  createOrder as createOrderController,
  getAllOrders as getAllOrdersController,
  getSingleOrder as getSingleOrderController,
  updateSingleOrder as updateSingleOrderController,
  deleteOrder as deleteOrderController,
} from "./orders.controller";

export {
  createAddress as createAddressController,
  getAllAddresses as getAllAddressesController,
  getAddress as getAddressController,
  updateAddress as updateAddressController,
  deleteAddress as deleteAddressController,
} from "./addresses.controller";

export { createUserImage as createUserImageController } from "./userImage";

export {
  getAllProductsImages as getAllProductsImagesController,
  getSingleImage as getSingleImageController,
  deleteProductImage as deleteProductImageController,
  createProductImage as createProductImageController,
} from "./productImage.controller";

export {
  getAllOfferImages as getAllOfferImagesController,
  createOfferImages as createOfferImageController,
  deleteOfferImage as deleteOfferImageController,
} from "./offerImage.controller";

export {
  createCarousel as createCarouselController,
  getCarousels as getCarouselsController,
  deleteCarousel as deleteCarouselController,
} from "./carousels.controller";

export { createCarouselImage as createCarouselImageController } from "./carouselImage";

export {
  createFeaturedProduct as createFeaturedProductController,
  getFeaturedProducts as getFeaturedProductsController,
  deleteFeaturedProduct as deleteFeaturedProductController,
} from "./featuredProducts.controller";
