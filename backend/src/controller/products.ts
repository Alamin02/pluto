import express = require("express");
import { getConnection } from "typeorm";
import { validationResult } from "express-validator";

import { Product } from "../entity";

// @GET - /api/v1/products
// Get all products list
export async function getAllProducts(
  req: express.Request,
  res: express.Response
) {
  const productRepository = getConnection().getRepository(Product);
  const products = await productRepository.find({
    select: ["name", "price", "summary"],
  });

  res.json({ data: products });
}

// @POST - /api/v1/products
// Create product
export async function createProduct(
  req: express.Request,
  res: express.Response
) {
  // error validation
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // get the repository from product entity
    const productsRepository = getConnection().getRepository(Product);

    // save data to repository from request body
    await productsRepository.save(req.body);
  } catch (e) {
    res.status(400).json({ error: "Product already exists in db" });
    return;
  }
  res.json({ msg: "Product created" });
}

// @GET - /api/v1/products/:productId
// Get a particular product
export async function getProduct(req: express.Request, res: express.Response) {
  const id = req.params.productId;
  const productRepository = getConnection().getRepository(Product);
  const findProductById = await productRepository.findOne({ id });

  if (!findProductById) {
    return res.status(400).json({ error: "Product not found" });
  }

  res.json({ msg: "product found", data: findProductById });
}

// @PUT - /api/v1/products/:productId
// Update product
export async function updateProduct(
  req: express.Request,
  res: express.Response
) {
  const id = req.params.productId;
  const productsRepository = getConnection().getRepository(Product);

  try {
    const findProductById: any = await productsRepository.findOne({ id });
    productsRepository.merge(findProductById, req.body);
    await productsRepository.save(findProductById);
  } catch (e) {
    return res.status(400).json({ error: "Product could not be updated" });
  }

  res.json({ msg: "Product updated" });
}

// @DELETE - /api/v1/products/:productId
// Delete a product
export async function deleteProduct(
  req: express.Request,
  res: express.Response
) {
  const id = req.params.productId;
  const productRepository = getConnection().getRepository(Product);

  try {
    await productRepository.delete(id);
  } catch (e) {
    return res.status(400).json({ error: "Product could not be deleted" });
  }

  res.json({ msg: "Product deleted" });
}
