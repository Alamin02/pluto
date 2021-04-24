import express = require("express");
import { getConnection } from "typeorm";
import { FeaturedProductImage, FeaturedProduct } from "../entity";

// @POST //v1/api/images/:productId
// create product image
export async function createFeaturedProductImage(
  req: express.Request,
  res: express.Response
) {
  const id = req.body.imageId;
  const featuredProductsRepository = getConnection().getRepository(
    FeaturedProduct
  );
  const product = await featuredProductsRepository.findOne({ id });
  const featuredProductImageRepository = getConnection().getRepository(
    FeaturedProductImage
  );

  const createFeaturedProductImage = [];
  const files = req.files as Express.Multer.File[];
  console.log(files);

  if (files.length && product) {
    for (let i = 0; i < files.length; i++) {
      const featuredProductImage = new FeaturedProductImage();
      featuredProductImage.path = files[i].path;
      featuredProductImage.originalname = files[i].originalname;
      featuredProductImage.featuredProduct = product;

      const savedFeaturedProductImage = await featuredProductImageRepository.save(
        featuredProductImage
      );
      createFeaturedProductImage.push(savedFeaturedProductImage);
    }

    res.json({ msg: "Image added" });
  } else {
    return res.status(400).json({ errors: [{ msg: "Image not found" }] });
  }
}

// @GET /v1/api/images
// all products images
export async function getAllFeaturedProductsImages(
  req: express.Request,
  res: express.Response
) {
  const featuredProductImageRepository = getConnection().getRepository(
    FeaturedProductImage
  );
  const allFeaturedProductsImages = await featuredProductImageRepository.find();
  res.status(200).json({ data: allFeaturedProductsImages });
}

// Get a particular product image
export async function getSingleFeaturedProductImage(
  req: express.Request,
  res: express.Response
) {
  const id = req.params.imageId;

  const featuredProductImageRepository = getConnection().getRepository(
    FeaturedProductImage
  );

  const findFeaturedProductImageById = await featuredProductImageRepository.findOne(
    { id }
  );

  if (!findFeaturedProductImageById) {
    return res.status(400).json({ errors: [{ msg: "Image not found" }] });
  }

  res.json({ msg: "Image found", data: findFeaturedProductImageById });
}

// @DELETE /v1/api/images/:imageId
// delete a image
export async function deleteFeaturedProductImage(
  req: express.Request,
  res: express.Response
) {
  const Id = req.params.imageId;
  const featuredProductImageRepository = getConnection().getRepository(
    FeaturedProductImage
  );
  const featuredProductImageToUpdate = await featuredProductImageRepository.findOne(
    { id: Id }
  );
  if (featuredProductImageToUpdate) {
    try {
      await featuredProductImageRepository.delete(Id);
      res.json({ msg: "image deleted" });
    } catch (e) {
      res.status(400).json({ msg: e });
    }
  } else {
    res.status(400).json({
      errors: [{ msg: "Product image to delete not found or invalid id" }],
    });
  }
}
