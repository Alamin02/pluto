import express = require("express");
import { getConnection } from "typeorm";
import { ProductImage } from "../entity";

// @POST //v1/api/product-images/:productId
// create product image
export async function createProductImage(
  req: express.Request,
  res: express.Response
) {
  try {
    const productImageRepository = getConnection().getRepository(ProductImage);

    const createProductImage = [];
    const files = req.files as Express.Multer.File[];

    if (files.length) {
      for (let i = 0; i < files.length; i++) {
        const productImage = new ProductImage();
        productImage.path = files[i].path;
        productImage.originalname = files[i].originalname;

        const savedProductImage = await productImageRepository.save(
          productImage
        );
        createProductImage.push(savedProductImage);
      }

      return res.status(200).json({
        success: true,
        message: "ProductImage added!",
        data: createProductImage,
      });
    } else {
      return res
        .status(400)
        .json({ success: false, error: "ProductImage not found!" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Something went wrong" });
  }
}

// @GET /v1/api/product-images
// all products images
export async function getAllProductsImages(
  req: express.Request,
  res: express.Response
) {
  const productImageRepository = getConnection().getRepository(ProductImage);
  const allProductsImages = await productImageRepository.find();
  return res.status(200).json({ success: true, data: allProductsImages });
}

//@GET /api/v1/product-images/:productImageId
// Get a particular product image
export async function getSingleImage(
  req: express.Request,
  res: express.Response
) {
  const id = req.params.productImageId;

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

// @DELETE /v1/api/images/:productImageId
// delete a image
export async function deleteProductImage(
  req: express.Request,
  res: express.Response
) {
  try {
    const Id = req.params.productImageId;
    const productImageRepository = getConnection().getRepository(ProductImage);
    const imageToDelete = await productImageRepository.findOne({ id: Id });
    if (imageToDelete) {
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
    console.log(error);
    return res.status(500).json("Something went wrong");
  }
}
