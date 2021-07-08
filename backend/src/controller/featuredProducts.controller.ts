import express = require("express");
import { getConnection } from "typeorm";

import { FeaturedProduct, FeaturedProductImage, Product } from "../entity";

// @POST - baseUrl/featured-product
export async function createFeaturedProduct(
  req: express.Request,
  res: express.Response
) {
  try {
    const { title, productId } = req.body;

    const productsRepository = getConnection().getRepository(Product);
    const featuredProductRepository =
      getConnection().getRepository(FeaturedProduct);
    const featuredProductImageRepository =
      getConnection().getRepository(FeaturedProductImage);

    const duplicate = await featuredProductRepository.findOne({ title });
    if (!duplicate) {
      const file = req.file as Express.Multer.File;

      const featuredProductImage = new FeaturedProductImage();
      featuredProductImage.path = file.path;
      featuredProductImage.originalName = file.originalname;

      await featuredProductImageRepository.save(featuredProductImage);

      const newFeaturedProduct = new FeaturedProduct();
      newFeaturedProduct.title = title;

      const productCheck = await featuredProductRepository.findOne({
        productId,
      });

      if (!productCheck) {
        newFeaturedProduct.productId = productId;
      } else {
        return res.status(400).json({
          success: false,
          error:
            "Product has already been featured! Try adding another product.",
        });
      }

      newFeaturedProduct.image = featuredProductImage;

      await featuredProductRepository.save(newFeaturedProduct);
      return res.status(200).json({
        success: true,
        message: "New featued product created!",
      });
    } else {
      return res.status(400).json({
        success: false,
        error: "This product has already been added to featured product!",
      });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      error: "Something went wrong",
    });
  }
}

// @GET - baseUrl/featured-product
export async function getFeaturedProducts(
  req: express.Request,
  res: express.Response
) {
  try {
    const featuredProductRepository =
      getConnection().getRepository(FeaturedProduct);

    const featuredProducts = await featuredProductRepository.find({
      select: ["id", "title", "productId"],
      relations: ["image"],
    });

    return res.status(200).json({
      success: true,
      data: featuredProducts,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      error: "Something went wrong",
    });
  }
}

// @DELETE - baseUrl/featured-product/:productId
export async function deleteFeaturedProduct(
  req: express.Request,
  res: express.Response
) {
  try {
    const id = req.params.productId;

    const featuredProductRepository =
      getConnection().getRepository(FeaturedProduct);

    const findFeaturedProductById = await featuredProductRepository.findOne({
      id: id,
    });

    if (findFeaturedProductById) {
      await featuredProductRepository.delete({ id });
      return res.status(200).json({
        success: true,
        message: "This product has been removed from featured products!",
      });
    } else {
      return res.status(400).json({
        success: false,
        error:
          "Product to remove from featured products not found or invalid id!",
      });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      error: "Something went wrong!",
    });
  }
}
