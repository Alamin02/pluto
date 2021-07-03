import { Router } from "express";
import { authenticationMiddleware, validationMiddleware } from "../middleware";
import {
  updateUserSchema,
  updateUserPasswordSchema,
} from "../validators/users.validator";
import {
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
  .get(authenticationMiddleware, getUsersController);

userRouter
  .route("/:userId")
  // @GET - baseUrl/users/:userId
  .get(authenticationMiddleware, getUserController)
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

export default userRouter;
