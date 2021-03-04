import express = require("express");
import { getConnection } from "typeorm";

import { ProductImage } from "../entity";

// @POST - /api/v1/productImages/uploadProductImage
// Upload Product Image
export async function uploadProductImage(
  req: express.Request,
  res: express.Response
) {
  const path = req.file && req.file.path;
  if (path) {
    let imagePath = "../public/images/" + req.file.filename;
    const imageRepository = getConnection().getRepository(ProductImage);

    const newProductImage = new ProductImage();
    newProductImage.path = imagePath;
    
    try {
      await imageRepository.save(newProductImage);
      res.json({ msg: "Product image uploaded" });
    } catch (error) {
      res.json({ error: error });
    }
  } else {
    res.json({ msg: "The file has not uploaded successfully" });
  }
}
