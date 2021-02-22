import express = require("express");
import { getConnection } from "typeorm";

import { Product } from "../entity";

// @POST - /api/v1/products
// Create product
export async function createProduct(
  req: express.Request,
  res: express.Response
) {
  const { name, price, summary, description } = req.body;

  // Save to database
  const productsRepository = getConnection().getRepository(Product);
  const newProduct = new Product();

  newProduct.name = name;
  newProduct.price = price;
  newProduct.description = description;
  newProduct.summary = summary;

  await productsRepository.save(newProduct);

  res.json({ msg: "Product created" });
}
