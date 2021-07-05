import { Router } from "express";
import { authenticationMiddleware, validationMiddleware } from "../middleware";
import {
  createAddressController,
  getAllAddressesController,
  getAddressController,
  updateAddressController,
  deleteAddressController,
} from "../controller";
import {
  createAddressSchema,
  updateAddressSchema,
} from "../validators/addresses.validator";

const addressRouter = Router();

addressRouter
  .route("/")
  // @GET - baseUrl/addresses
  .get(authenticationMiddleware, getAllAddressesController)
  // @POST - baseUrl/addresses
  .post(
    validationMiddleware(createAddressSchema),
    authenticationMiddleware,
    createAddressController
  );

addressRouter
  .route("/:addressId")
  // @GET - baseUrl/addresses/:addressId
  .get(authenticationMiddleware, getAddressController)
  // @PUT - baseUrl/addresses/:addressId
  .put(
    validationMiddleware(updateAddressSchema),
    authenticationMiddleware,
    updateAddressController
  )
  // @DELETE - baseUrl/addresses/:addressId
  .delete(authenticationMiddleware, deleteAddressController);

export default addressRouter;
