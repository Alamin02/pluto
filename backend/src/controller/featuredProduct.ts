import express = require("express");
import { getConnection, Like } from "typeorm";

import { validationResult } from "express-validator";
import accessControl from "../utils/access-control";

import {
  FeaturedProduct,
  Offer,
  Category,
  FeaturedProductImage,
  Order,
} from "../entity";

// @GET - /api/v1/products
// Get all products list
export async function getAllFeaturedProducts(
  req: express.Request,
  res: express.Response
) {
  const faeturedProductRepository = getConnection().getRepository(
    FeaturedProduct
  );

  const page: number = parseInt(<string>req.query.page) || 1;
  const perPage: number = parseInt(<string>req.query.perPage) || 12;
  const search: string = <string>req.query.search || "";
  const sort: string = <string>req.query.sort || "createdAt";

  const [
    featuredProducts,
    featuredProductCount,
  ] = await faeturedProductRepository.findAndCount({
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

  res.json({
    data: {
      featuredProducts,
      featuredProductCount,
      currentPage: page,
      maxPages: Math.ceil(featuredProductCount / perPage),
      perPage,
    },
  });
}

// @POST - /api/v1/products
// Create product
export async function createFeaturedProduct(
  req: express.Request,
  res: express.Response
) {
  //  const permission = accessControl
  //    .can(res.locals.user.role)
  //    .createAny("product");

  //  if (!permission.granted) {
  //    return res.status(403).json({ errors: [{ msg: "not authorized" }] });
  //  }

  // // error validation
  //  const errors = validationResult(req);

  //  if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });
  // }
  const { name, price, summary, description, offerId, categoryId } = req.body;

  try {
    // get the repository from product entity
    const faeturedProductRepository = getConnection().getRepository(
      FeaturedProduct
    );
    const categoryRepository = getConnection().getRepository(Category);
    const categoryCheck = await categoryRepository.findOne({
      id: categoryId,
    });

    const offersRepository = getConnection().getRepository(Offer);

    const featuredProductImageRepository = getConnection().getRepository(
      FeaturedProductImage
    );
    let offer;
    if (offerId) {
      offer = await offersRepository.findOne({ id: offerId });
    }

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
      return res.json({ errors: [{ msg: "Image not found" }] });
    }

    const newFeaturedProduct = new FeaturedProduct();
    newFeaturedProduct.name = name;
    newFeaturedProduct.description = description;
    newFeaturedProduct.price = price;
    newFeaturedProduct.summary = summary;
    newFeaturedProduct.images = createFeaturedProductImage;
    if (categoryCheck) {
      newFeaturedProduct.category = categoryId;
    } else {
      res.status(400).json({ errors: [{ msg: "category not found" }] });
    }

    if (offer) {
      newFeaturedProduct.offer = offer;
    }

    // save data to repository from request body
    await faeturedProductRepository.save(newFeaturedProduct);
  } catch (e) {
    res.status(400).json({ errors: [{ msg: e }] });
    return;
  }
  res.json({ msg: "Featured Product created" });
}

// @GET - /api/v1/products/:productId
// Get a particular product
export async function getFeaturedProduct(
  req: express.Request,
  res: express.Response
) {
  const id = req.params.featuredProductId;

  const featuredProductRepository = getConnection().getRepository(
    FeaturedProduct
  );
  const findFeaturedProductById = await featuredProductRepository.findOne(
    {
      id,
    },
    { relations: ["images"] }
  );

  if (!findFeaturedProductById) {
    return res
      .status(400)
      .json({ errors: [{ msg: "Featured Product not found" }] });
  }

  res.json({ msg: "featured product found", data: findFeaturedProductById });
}

// @PUT - /api/v1/products/:Id
// Update product
export async function updateFeaturedProduct(
  req: express.Request,
  res: express.Response
) {
  // const permission = accessControl
  //   .can(res.locals.user.role)
  //   .updateAny("product");

  // if (!permission.granted) {
  //   return res.status(403).json({ errors: [{ msg: "not authorized" }] });
  // }

  const id = req.params.featuredProductId;
  const { name, price, summary, description, offerId, categoryId } = req.body;
  const featuredProductsRepository = getConnection().getRepository(
    FeaturedProduct
  );

  try {
    const findFeaturedProductById: any = await featuredProductsRepository.findOne(
      { id }
    );
    // offer repository
    const offersRepository = getConnection().getRepository(Offer);
    // find offer by id
    const offer = await offersRepository.findOne({ id: offerId });

    // categories repository
    const categoriesRepository = getConnection().getRepository(Category);
    // find category by id
    const category = await categoriesRepository.findOne({ id: categoryId });

    const newFeaturedProduct = new FeaturedProduct();

    newFeaturedProduct.name = name;
    newFeaturedProduct.description = description;
    newFeaturedProduct.price = price;
    newFeaturedProduct.summary = summary;

    if (offer) {
      newFeaturedProduct.offer = offer;
    }

    if (category) {
      newFeaturedProduct.category = category;
    }

    featuredProductsRepository.merge(
      findFeaturedProductById,
      newFeaturedProduct
    );

    await featuredProductsRepository.save(findFeaturedProductById);
  } catch (e) {
    return res
      .status(400)
      .json({ errors: [{ msg: "Featured Product could not be updated" }] });
  }

  res.json({ msg: "Featured Product updated" });
}

// @DELETE - /api/v1/products/:Id
// Delete a product
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

  const id = req.params.featuredProductId;
  const featuredProductRepository = getConnection().getRepository(
    FeaturedProduct
  );
  const featuredProductToUpdate = await featuredProductRepository.findOne({
    id: id,
  });

  if (featuredProductToUpdate) {
    try {
      await featuredProductRepository.delete({ id });
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
