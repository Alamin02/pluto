import express = require("express");
import { getConnection } from "typeorm";
import { ProductImage, Product } from "../entity";

// @POST //v1/api/images/:productId
// create product image
export async function createProductImage(
  req: express.Request,
  res: express.Response
) {
  const id = req.body.productId;
  const productsRepository = getConnection().getRepository(Product);
  const product = await productsRepository.findOne({ id });
  const productImageRepository = getConnection().getRepository(ProductImage);

  const createProductImage = [];
  const files = req.files as Express.Multer.File[];

  if (files.length && product) {
    for (let i = 0; i < files.length; i++) {
      const productImage = new ProductImage();
      productImage.path = files[i].path;
      productImage.originalname = files[i].originalname;
      productImage.product = product;

      const savedProductImage = await productImageRepository.save(productImage);
      createProductImage.push(savedProductImage);
    }

    return res
      .status(200)
      .json({ success: true, message: "ProductImage added!" });
  } else {
    return res
      .status(400)
      .json({ success: false, error: "ProductImage not found!" });
  }
}

// @GET /v1/api/images
// all products images
export async function getAllProductsImages(
  req: express.Request,
  res: express.Response
) {
  const productImageRepository = getConnection().getRepository(ProductImage);
  const allProductsImages = await productImageRepository.find();
  return res.status(200).json({ success: true, data: allProductsImages });
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
    return res
      .status(400)
      .json({ success: false, error: "ProductImage not found!" });
  }

  return res.status(200).json({
    success: true,
    message: "ProductImage found!",
    data: findImageById,
  });
}

// @DELETE /v1/api/images/:imageId
// delete a image
export async function deleteProductImage(
  req: express.Request,
  res: express.Response
) {
  try {
    const Id = req.params.imageId;
    const productImageRepository = getConnection().getRepository(ProductImage);
    const imageToUpdate = await productImageRepository.findOne({ id: Id });
    if (imageToUpdate) {
      await productImageRepository.delete(Id);
      return res
        .status(200)
        .json({ success: true, message: "ProductImage deleted!" });
    } else {
      return res.status(400).json({
        success: false,
        error: "Invalid productImageId!",
      });
    }
  } catch (error) {
    return res.status(400).json("Something went wrong");
  }
}
