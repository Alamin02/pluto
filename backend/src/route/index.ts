import { Router } from "express";

import authRouter from "./auth.route";
import userRouter from "./users.route";
import productRouter from "./products.route";
import offersRouter from "./offers.route";
import offerImageRouter from "./offerImages.route";
import blogRouter from "./blogs.route";
import categoryRouter from "./category.route";
import orderRouter from "./orders.route";
import addressRouter from "./addresses.route";
import productImageRouter from "./productImages.route";
import userImageRouter from "./userImages";
import carouselRouter from "./carousels.route";
import carouselImageRouter from "./carouselImages";
import featuredProductRouter from "./featuredProducts.route";
import imageRouter from "./images.route";
import settingsRouter from "./settings.route";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/offers", offersRouter);
router.use("/offer-images", offerImageRouter);
router.use("/category", categoryRouter);
router.use("/blogs", blogRouter);
router.use("/orders", orderRouter);
router.use("/addresses", addressRouter);
router.use("/product-images", productImageRouter);
router.use("/user-image", userImageRouter);
router.use("/carousels", carouselRouter);
router.use("/carousel-image", carouselImageRouter);
router.use("/featured-products", featuredProductRouter);
router.use("/image", imageRouter);
router.use("/settings", settingsRouter);

export default router;
