import express = require("express");
import { getConnection } from "typeorm";
import { validationResult } from "express-validator";

import { Product, Offer, Category, ProductImage } from "../entity";

// @GET - /api/v1/products
// Get all products list
export async function getAllProducts(
  req: express.Request,
  res: express.Response
) {
  const productRepository = getConnection().getRepository(Product);

  const page: number = parseInt(<string>req.query.page) || 1;
  const perPage: number = parseInt(<string>req.query.perPage) || 10;

  const [products, productCount] = await productRepository.findAndCount({
    select: ["id", "name", "price", "summary"],
    relations: ["category", "offer", "images"],
    take: perPage,
    skip: (page - 1) * perPage,
  });

  res.json({
    data: {
      products,
      productCount,
      currentPage: page,
      maxPages: Math.ceil(productCount / perPage),
      perPage,
    },
  });
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
  const path = req.files;
  const { name, price, summary, description, offerId, categoryId } = req.body;

  try {
    // get the repository from product entity
    const productsRepository = getConnection().getRepository(Product);

    const categoryRepository = getConnection().getRepository(Category);
    const categoryCheck = await categoryRepository.findOne({
      id: categoryId,
    });

    const offersRepository = getConnection().getRepository(Offer);
    const offer = await offersRepository.findOne({ id: offerId });

    const productImageRepository = getConnection().getRepository(ProductImage);
    const createProductImage = [];

    const files = req.files as Express.Multer.File[];
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const imagePath = "../public/images/" + files[i].filename;
        const productImage = new ProductImage();
        productImage.path = imagePath;

        const savedProductimage = await productImageRepository.save(
          productImage
        );
        createProductImage.push(savedProductimage);
      }
    } else {
      return res.json("Image no found");
    }

    const newProduct = new Product();
    newProduct.name = name;
    newProduct.description = description;
    newProduct.price = price;
    newProduct.summary = summary;
    newProduct.images = createProductImage;
    if (categoryCheck) {
      newProduct.category = categoryId;
    } else {
      res.status(400).json({ msg: "category not found" });
    }
    newProduct.images = [];
    if (offer) {
      newProduct.offer = offer;
    }

    // save data to repository from request body
    await productsRepository.save(newProduct);
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
  const { name, price, summary, description, offerId } = req.body;
  const productsRepository = getConnection().getRepository(Product);

  try {
    const findProductById: any = await productsRepository.findOne({ id });
    // offer repository
    const offersRepository = getConnection().getRepository(Offer);
    // find offer by id
    const offer = await offersRepository.findOne({ id: offerId });

    const newProduct = new Product();

    newProduct.name = name;
    newProduct.description = description;
    newProduct.price = price;
    newProduct.summary = summary;
    newProduct.images = [];
    if (offer) {
      newProduct.offer = offer;
    }
    productsRepository.merge(findProductById, newProduct);

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
