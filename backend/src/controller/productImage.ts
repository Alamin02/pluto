import express = require("express");
import { getConnection } from "typeorm";
import { validationResult } from "express-validator";
import { ProductImage } from "../entity";

// @GET /v1/api/products/images
// all products images
export async function getAllProductsImages(
  req: express.Request,
  res: express.Response
) {
  const productImageRepository = getConnection().getRepository(ProductImage);
  const allProductsImages = await productImageRepository.find();
  res.status(200).json({ data: allProductsImages });
}

// Get a particular product image
export async function getSingleImage(
  req: express.Request,
  res: express.Response
) {
  const id = req.params.imageId;

  const productImageRepository = getConnection().getRepository(ProductImage);

  const findImageById = await productImageRepository.findOne({ id });

  if (!findImageById) {
    return res.status(400).json({ errors: [{ msg: "Image not found" }] });
  }

  res.json({ msg: "Image found", data: findImageById });
}

// @DELETE /v1/api/images/:imageId
// delete a image
export async function deleteProductImage(
  req: express.Request,
  res: express.Response
) {
  const Id = req.params.imageId;
  const productImageRepository = getConnection().getRepository(ProductImage);
  const imageToUpdate = await productImageRepository.findOne({ id: Id });
  if (imageToUpdate) {
    try {
      await productImageRepository.delete(Id);
      res.json({ msg: "image deleted" });
    } catch (e) {
      res.status(400).json({ msg: e });
    }
  } else {
    res
      .status(400)
      .json({
        errors: [{ msg: "Product image to delete not found or invalid id" }],
      });
  }
}
