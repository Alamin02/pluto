import express = require("express");
import { getConnection, Like } from "typeorm";

import { validationResult } from "express-validator";
import accessControl from "../utils/access-control";

import { FeaturedProduct, FeaturedProductImage } from "../entity";

// @POST - /api/v1/featured-products
// Create featured product
export async function createFeaturedProduct(
  req: express.Request,
  res: express.Response
) {
  // const permission = accessControl
  //   .can(res.locals.user.role)
  //   .createAny("product");

  // if (!permission.granted) {
  //   return res.status(403).json({ errors: [{ msg: "not authorized" }] });
  // }

  // // error validation
  // const errors = validationResult(req);

  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });
  // }

  try {
    // get the repository from  featured product entity
    const featuredProductsRepository = getConnection().getRepository(
      FeaturedProduct
    );

    const featuredProductImageRepository = getConnection().getRepository(
      FeaturedProductImage
    );

    const createFeaturedProductImage = [];
    const files = req.files as Express.Multer.File[];

    if (files.length) {
      for (let i = 0; i < files.length; i++) {
        const featuredProductImage = new FeaturedProductImage();
        featuredProductImage.path = files[i].path;
        featuredProductImage.originalname = files[i].originalname;

        const savedFeaturedProductImage = await featuredProductImageRepository.save(
          featuredProductImage
        );
        createFeaturedProductImage.push(savedFeaturedProductImage);
      }
    } else {
      return res.json({
        errors: [{ msg: "Featured Product Image not found" }],
      });
    }

    const newFeaturedProduct = new FeaturedProduct();
    newFeaturedProduct.images = createFeaturedProductImage;

    // save data
    const data = await featuredProductsRepository.save(newFeaturedProduct);
    res.json({ msg: "Featured Products created", data: data });
    return;
  } catch (e) {
    res.status(400).json({ errors: [{ msg: e }] });
    return;
  }
}

// @GET - /api/v1/featured-products
// Get all featured products list
export async function getAllFeaturedProducts(
  req: express.Request,
  res: express.Response
) {
  const featuredProductsRepository = getConnection().getRepository(
    FeaturedProduct
  );

  const page: number = parseInt(<string>req.query.page) || 1;
  const perPage: number = parseInt(<string>req.query.perPage) || 12;

  const [
    featuredProduct,
    featuredProductCount,
  ] = await featuredProductsRepository.findAndCount({
    select: ["id", "createdAt"],
    relations: ["images"],
    take: perPage,
    skip: (page - 1) * perPage,
  });

  res.json({
    data: {
      featuredProduct,
      featuredProductCount,
      currentPage: page,
      maxPages: Math.ceil(featuredProductCount / perPage),
      perPage,
    },
  });
}

// @DELETE - /api/v1/featured-products/:Id
// Delete a featured product
export async function deleteFeaturedProduct(
  req: express.Request,
  res: express.Response
) {
  // const permission = accessControl
  //   .can(res.locals.user.role)
  //   .deleteAny("product");

  // if (!permission.granted) {
  //   return res.status(403).json({ errors: [{ msg: "not authorized" }] });
  // }

  const id = req.params.Id;
  const featuredProductsRepository = getConnection().getRepository(
    FeaturedProduct
  );
  const featuredProductToUpdate = await featuredProductsRepository.findOne({
    id: id,
  });

  if (featuredProductToUpdate) {
    try {
      await featuredProductsRepository.delete({ id });
      res.json({ msg: "Featured Product deleted" });
    } catch (e) {
      res.status(400).json({ msg: e });
    }
  } else {
    res.status(400).json({
      errors: [{ msg: "Featured Product to delete not found or invalid id" }],
    });
  }
}
