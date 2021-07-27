import { Router } from "express";
import { authenticationMiddleware, validationMiddleware } from "../middleware";
import {
  createUserSchema,
  updateUserSchema,
  updateUserPasswordSchema,
} from "../validators/users.validator";
import {
  createUserController,
  getUsersController,
  getUserController,
  updateUserController,
  updateUserPasswordController,
  deleteUserController,
} from "../controller";

const userRouter = Router();

userRouter
  .route("/")
  // @GET - baseUrl/users
  .get(authenticationMiddleware, getUsersController)
  .post(validationMiddleware(createUserSchema), createUserController);

userRouter
  .route("/:userId")
  // @GET - baseUrl/users/:userId
  // @PUT - baseUrl/users/:userId
  .put(
    validationMiddleware(updateUserSchema),
    authenticationMiddleware,
    updateUserController
  )
  // @DELETE - baseUrl/users/:userId
  .delete(authenticationMiddleware, deleteUserController);

userRouter
  // @PUT - baseUrl/users/:userId/password
  .route("/:userId/password")
  .put(
    validationMiddleware(updateUserPasswordSchema),
    authenticationMiddleware,
    updateUserPasswordController
  );
userRouter.route("/profile").get(authenticationMiddleware, getUserController);

export default userRouter;
