import { Router } from "express";
import { authenticationMiddleware, validationMiddleware } from "../middleware";
import {
  createUserAdminSchema,
  updateUserAdminSchema,
} from "../validators/users.admin.validator";
import {
  createUserAdminController,
  updateUserAdminController,
} from "../controller";

const userAdminRouter = Router();

userAdminRouter
  // @POST - baseUrl/users/admin
  .route("/")
  .post(validationMiddleware(createUserAdminSchema), createUserAdminController);

// @PUT - baseUrl/users/admin/:userId
userAdminRouter
  .route(":/userId")
  .put(
    validationMiddleware(updateUserAdminSchema),
    authenticationMiddleware,
    updateUserAdminController
  );

export default userAdminRouter;
