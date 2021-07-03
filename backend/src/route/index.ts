import { Router } from "express";

import authRouter from "./auth.route";
import userRouter from "./users.route";
import productRouter from "./products";
import offersRouter from "./offers.route";
import blogRouter from "./blogs.route";
import categoryRouter from "./category.route";
import orderRouter from "./orders";
import addressRouter from "./addresses";
import productImageRouter from "./productImages";
import userImageRouter from "./userImages";
import carouselController from "./carousels";
import carouselImageController from "./carouselImages";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/offers", offersRouter);
router.use("/category", categoryRouter);
router.use("/blogs", blogRouter);
router.use("/orders", orderRouter);
router.use("/addresses", addressRouter);
router.use("/images", productImageRouter);
router.use("/user-image", userImageRouter);
router.use("/carousels", carouselController);
router.use("/carousel-image", carouselImageController);

export default router;
