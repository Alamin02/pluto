import { Router } from "express";

import authRouter from "./auth.route";
import userRouter from "./users.route";
import productRouter from "./products.route";
import offerRouter from "./offers";
import blogRouter from "./blogs";
import categoryRouter from "./category";
import orderRouter from "./orders";
import addressRouter from "./addresses";
import productImageRouter from "./productImages";
import userImageRouter from "./userImages";
import carouselRouter from "./carousels.route";
import carouselImageRouter from "./carouselImages";
import userAdminRouter from "./users.admin.route";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/offers", offerRouter);
router.use("/category", categoryRouter);
router.use("/blogs", blogRouter);
router.use("/orders", orderRouter);
router.use("/addresses", addressRouter);
router.use("/images", productImageRouter);
router.use("/user-image", userImageRouter);
router.use("/carousels", carouselRouter);
router.use("/carousel-image", carouselImageRouter);
router.use("/users/admin", userAdminRouter);

export default router;
