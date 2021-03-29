import express = require("express");
import { getConnection, Like } from "typeorm";

import { validationResult } from "express-validator";
import accessControl from "../utils/access-control";

import { Product, Offer, Category, ProductImage } from "../entity";

// @GET - /api/v1/products
// Get all products list
export async function getAllProducts(
  req: express.Request,
  res: express.Response
) {
  const productRepository = getConnection().getRepository(Product);

  const page: number = parseInt(<string>req.query.page) || 1;
  const perPage: number = parseInt(<string>req.query.perPage) || 12;
  const search: string = <string>req.query.search || "";

  const [products, productCount] = await productRepository.findAndCount({
    select: ["id", "name", "description", "price", "summary"],
    relations: ["category", "offer", "images"],
    where: {
      name: Like(`%${search}%`),
    },
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
  const permission = accessControl
    .can(res.locals.user.role)
    .createAny("product");

  if (!permission.granted) {
    return res.status(403).json({ errors: [{ msg: "not authorized" }] });
  }

  // error validation
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, price, summary, description, offerId, categoryId } = req.body;

  try {
    // get the repository from product entity
    const productsRepository = getConnection().getRepository(Product);
    const categoryRepository = getConnection().getRepository(Category);
    const categoryCheck = await categoryRepository.findOne({
      id: categoryId,
    });

    const offersRepository = getConnection().getRepository(Offer);

    const productImageRepository = getConnection().getRepository(ProductImage);
    let offer;
    if (offerId) {
      offer = await offersRepository.findOne({ id: offerId });
    }

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
    } else {
      return res.json({ errors: [{ msg: "Image not found" }] });
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
      res.status(400).json({ errors: [{ msg: "category not found" }] });
    }

    if (offer) {
      newProduct.offer = offer;
    }

    // save data to repository from request body
    await productsRepository.save(newProduct);
  } catch (e) {
    res.status(400).json({ errors: [{ msg: e }] });
    return;
  }
  res.json({ msg: "Product created" });
}

// @GET - /api/v1/products/:productId
// Get a particular product
export async function getProduct(req: express.Request, res: express.Response) {
  const id = req.params.productId;

  const productRepository = getConnection().getRepository(Product);
  const findProductById = await productRepository.findOne(
    {
      id,
    },
    { relations: ["images"] }
  );

  if (!findProductById) {
    return res.status(400).json({ errors: [{ msg: "Product not found" }] });
  }

  res.json({ msg: "product found", data: findProductById });
}

// @PUT - /api/v1/products/:productId
// Update product
export async function updateProduct(
  req: express.Request,
  res: express.Response
) {
  const permission = accessControl
    .can(res.locals.user.role)
    .updateAny("product");

  if (!permission.granted) {
    return res.status(403).json({ errors: [{ msg: "not authorized" }] });
  }

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
    return res
      .status(400)
      .json({ errors: [{ msg: "Product could not be updated" }] });
  }

  res.json({ msg: "Product updated" });
}

// @DELETE - /api/v1/products/:productId
// Delete a product
export async function deleteProduct(
  req: express.Request,
  res: express.Response
) {
  const permission = accessControl
    .can(res.locals.user.role)
    .deleteAny("product");

  if (!permission.granted) {
    return res.status(403).json({ errors: [{ msg: "not authorized" }] });
  }

  const id = req.params.productId;
  const productRepository = getConnection().getRepository(Product);
  const productToUpdate = await productRepository.findOne({ id: id });

  if (productToUpdate) {
    try {
      await productRepository.delete({ id });
      res.json({ msg: "Product deleted" });
    } catch (e) {
      res.status(400).json({ msg: e });
    }
  } else {
    res
      .status(400)
      .json({ errors: [{ msg: "Product to delete not found or invalid id" }] });
  }
}
