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
