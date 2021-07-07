import express = require("express");
import { getConnection, Like } from "typeorm";

import accessControl from "../utils/access-control";

import { Product, Offer, Category, ProductImage } from "../entity";

// @GET - baseUrl/products
// Get all products list
export async function getAllProducts(
  req: express.Request,
  res: express.Response
) {
  try {
    const productRepository = getConnection().getRepository(Product);

    const page: number = parseInt(<string>req.query.page) || 1;
    const perPage: number = parseInt(<string>req.query.perPage) || 12;
    const search: string = <string>req.query.search || "";
    const sort: string = <string>req.query.sort || "createdAt";

    const [products, productCount] = await productRepository.findAndCount({
      select: ["id", "name", "description", "price", "summary", "createdAt"],
      relations: ["category", "offer", "images"],
      where: {
        name: Like(`%${search}%`),
      },
      order: {
        [sort]: "ASC",
      },
      take: perPage,
      skip: (page - 1) * perPage,
    });

    return res.status(200).json({
      success: true,
      data: {
        products,
        productCount,
        currentPage: page,
        maxPages: Math.ceil(productCount / perPage),
        perPage,
      },
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      error: "Something went wrong",
    });
  }
}

// @POST - /api/v1/products
// Create product
export async function createProduct(
  req: express.Request,
  res: express.Response
) {
  try {
    const permission = accessControl
      .can(res.locals.user.role)
      .createAny("product");

    if (!permission.granted) {
      return res.status(403).json({ success: false, error: "Not authorized" });
    }

    const { name, price, summary, description, offerId, categoryId } = req.body;
    const productsRepository = getConnection().getRepository(Product);
    const categoryRepository = getConnection().getRepository(Category);
    const offersRepository = getConnection().getRepository(Offer);
    const productImageRepository = getConnection().getRepository(ProductImage);

    const previousEntry = await productsRepository.findOne({ name: name });

    if (!previousEntry) {
      const categoryCheck = await categoryRepository.findOne({
        id: categoryId,
      });

      const productImages = [];
      const files = req.files as Express.Multer.File[];

      if (files.length) {
        for (let i = 0; i < files.length; i++) {
          const productImage = new ProductImage();
          productImage.path = files[i].path;
          productImage.originalname = files[i].originalname;

          const savedProductImage = await productImageRepository.save(
            productImage
          );
          productImages.push(savedProductImage);
        }
      } else {
        return res.json({ success: false, error: "Image not found" });
      }

      const newProduct = new Product();

      newProduct.name = name;
      newProduct.description = description;
      newProduct.price = price;
      newProduct.summary = summary;
      newProduct.images = productImages;

      if (categoryCheck) {
        newProduct.category = categoryId;
      } else {
        return res
          .status(400)
          .json({ success: false, error: "Category not found!" });
      }

      const offerCheck = await offersRepository.findOne({ id: offerId });
      if (offerCheck) {
        newProduct.offer = offerId;
      } else if (offerId != "undefined") {
        return res
          .status(400)
          .json({ success: false, error: "Offer not found" });
      }

      await productsRepository.save(newProduct);
      return res
        .status(200)
        .json({ success: true, message: "New product added!" });
    } else {
      return res
        .status(400)
        .json({ success: false, error: "Product already exists" });
    }
  } catch (e) {
    // console.error(e);

    return res
      .status(500)
      .json({ success: false, error: "Something went wrong" });
  }
}

// @GET - /api/v1/products/:productId
// Get a particular product
export async function getProduct(req: express.Request, res: express.Response) {
  try {
    const id = req.params.productId;

    const productRepository = getConnection().getRepository(Product);

    const findProductById = await productRepository.findOne(
      { id },
      { relations: ["images","offer"] }
    );

    if (!findProductById) {
      return res
        .status(400)
        .json({ success: false, error: "Product not found!" });
    }

    return res.status(200).json({
      success: true,
      message: "Product found!",
      data: findProductById,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      error: "Something went wrong!",
    });
  }
}

// @PUT - /api/v1/products/:productId
// Update product
export async function updateProduct(
  req: express.Request,
  res: express.Response
) {
  try {
    const permission = accessControl
      .can(res.locals.user.role)
      .updateAny("product");

    if (!permission.granted) {
      return res.status(403).json({ error: "Not authorized" });
    }

    const id = req.params.productId;

    const { name, price, summary, description, offerId, categoryId } = req.body;
    const productsRepository = getConnection().getRepository(Product);
    const findProductById: any = await productsRepository.findOne({ id });
    const offersRepository = getConnection().getRepository(Offer);
    const categoriesRepository = getConnection().getRepository(Category);
    const offer = await offersRepository.findOne({ id: offerId });
    const category = await categoriesRepository.findOne({ id: categoryId });
    const duplicate = await productsRepository.findOne({ name });

    if (findProductById) {
      if (duplicate && duplicate.id !== id) {
        return res.status(400).json({
          success: false,
          error: "Product with this title already exists!",
        });
      }
      const newProduct = new Product();

      newProduct.name = name;
      newProduct.description = description;
      newProduct.price = price;
      newProduct.summary = summary;

      if (offer) {
        newProduct.offer = offer;
      }

      if (category) {
        newProduct.category = category;
      }

      productsRepository.merge(findProductById, newProduct);

      await productsRepository.save(findProductById);
      return res
        .status(200)
        .json({ success: true, message: "Product updated!" });
    } else {
      return res
        .status(200)
        .json({ success: false, error: "Invalid productId" });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      error: "Something went wrong",
    });
  }
}

// @DELETE - /api/v1/products/:productId
// Delete a product
export async function deleteProduct(
  req: express.Request,
  res: express.Response
) {
  try {
    const permission = accessControl
      .can(res.locals.user.role)
      .deleteAny("product");

    if (!permission.granted) {
      return res.status(403).json({ error: "Not authorized" });
    }

    const id = req.params.productId;

    const productRepository = getConnection().getRepository(Product);
    const productToDelete = await productRepository.findOne({ id: id });
    if (productToDelete) {
      await productRepository.delete({ id });
      return res
        .status(200)
        .json({ success: true, message: "Product deleted!" });
    } else {
      return res.status(400).json({
        success: false,
        error: "Product to delete not found or invalid id.",
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
