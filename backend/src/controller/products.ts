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

  const productsRepository = getConnection().getRepository(Product);
  const newProduct = new Product();

  newProduct.name = name;
  newProduct.price = price;
  newProduct.description = description;
  newProduct.summary = summary;

  try {
    // Save to database
    await productsRepository.save(newProduct);
    res.json({ msg: "Product created" });
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
    return;
  }
}

// @GET - /api/v1/products
// List of all products
export async function getProduct(req: express.Request, res: express.Response) {
  // Find all the products
  try {
    const productsRepository = getConnection().getRepository(Product);
    const products = await productsRepository.find({});

    res.json({ data: products });
    // console.log(req.params);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
    return;
  }
}

// @GET - /api/v1/products/:id
// Get a product details
export async function productDetails(
  req: express.Request,
  res: express.Response
) {
  try {
    const productsRepository = getConnection().getRepository(Product);
    const productDetails = await productsRepository.findOne(req.params.productId);
    res.json({ data: productDetails });
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
    return;
  }
}


// @PATCH - /api/v1/products/:id
// Update a product details
export async function updateProduct(
  req: express.Request,
  res: express.Response
) {
  const { name, price, summary, description } = req.body;

  const productsRepository = getConnection().getRepository(Product);

  const newProduct = new Product();

  newProduct.name = name;
  newProduct.price = price;
  newProduct.description = description;
  newProduct.summary = summary;

  try {
    await productsRepository.update({id: req.params.productId},newProduct);
    res.json({ msg: "Product updated" });
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
    return;
  }
}