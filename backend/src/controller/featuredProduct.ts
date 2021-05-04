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
  Product,
  ProductImage,
} from "../entity";

// @GET - /api/v1/featured-products
// Get all featured products list
export async function getAllFeaturedProducts(
  req: express.Request,
  res: express.Response
) {
  // get the repository from featured product entity
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
    relations: ["category", "offer", "images", "product"],
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

// @POST - /api/v1/featured-products
// Create featured product
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
    // get the repository from Product, FeaturedProduct entity
    const productRepository = getConnection().getRepository(Product);
    const faeturedProductRepository = getConnection().getRepository(
      FeaturedProduct
    );

    // get the repository from Category, Offer entity
    const categoryRepository = getConnection().getRepository(Category);
    const categoryCheck = await categoryRepository.findOne({
      id: categoryId,
    });

    const offerRepository = getConnection().getRepository(Offer);
    let offer;
    if (offerId) {
      offer = await offerRepository.findOne({ id: offerId });
    }

    // get the repository from ProductImage, FeaturedProductImage entity
    const featuredProductImageRepository = getConnection().getRepository(
      FeaturedProductImage
    );
    const productImageRepository = getConnection().getRepository(ProductImage);

    const createFeaturedProductImage = [];
    const createProductImage = [];
    const files = req.files as Express.Multer.File[];

    if (files.length) {
      for (let i = 0; i < files.length; i++) {
        const featuredProductImage = new FeaturedProductImage();
        const productImage = new ProductImage();
        featuredProductImage.path = files[i].path;
        featuredProductImage.originalname = files[i].originalname;

        productImage.path = files[i].path;
        productImage.originalname = files[i].originalname;

        // save image in FeaturedProductImage entity
        const savedFeaturedProductImage = await featuredProductImageRepository.save(
          featuredProductImage
        );
        createFeaturedProductImage.push(savedFeaturedProductImage);

        // save image in ProductImage entity
        const savedProductImage = await productImageRepository.save(
          productImage
        );
        createProductImage.push(savedProductImage);
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

    const newProduct = new Product(); // same as newProduct = productRepository.create();
    newProduct.name = name;
    newProduct.description = description;
    newProduct.price = price;
    newProduct.summary = summary;
    newProduct.images = createProductImage;

    if (categoryCheck) {
      newFeaturedProduct.category = categoryId;
      newProduct.category = categoryId;
    } else {
      res.status(400).json({ errors: [{ msg: "category not found" }] });
    }

    if (offer) {
      newFeaturedProduct.offer = offer;
      newProduct.offer = offer;
    }

    // save data to repository from request body
    newFeaturedProduct.product = await productRepository.save(newProduct);

    // save data to repository from request body
    await faeturedProductRepository.save(newFeaturedProduct);
  } catch (e) {
    res.status(400).json({ errors: [{ msg: e }] });
    return;
  }
  res.json({ msg: "Featured Product created" });
}

// @GET - /api/v1/featured-products/:featuredProductId
// Get a particular  featured product
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

// @PUT - /api/v1/featured-products/:featuredProductId
// Update featured product
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

  try {
    // get the repository from FeaturedProduct entity
    const featuredProductRepository = getConnection().getRepository(
      FeaturedProduct
    );
    // find featured product by id
    const findFeaturedProductById: any = await featuredProductRepository.findOne(
      { id },
      { relations: ["images", "category", "offer", "product"] }
    );

    const existingProductId = findFeaturedProductById.product.id;
    // get the repository from Product entity
    const productRepository = getConnection().getRepository(Product);
    // get product by id with the help of existing product id
    const findProductById = await productRepository.findOneOrFail({
      id: existingProductId,
    });

    // offer repository
    const offersRepository = getConnection().getRepository(Offer);
    // find offer by id
    const offer = await offersRepository.findOne({ id: offerId });

    // categories repository
    const categoriesRepository = getConnection().getRepository(Category);
    // find category by id
    const category = await categoriesRepository.findOne({ id: categoryId });

    const newFeaturedProduct = new FeaturedProduct();
    const newProduct = new Product();

    newFeaturedProduct.name = name;
    newFeaturedProduct.description = description;
    newFeaturedProduct.price = price;
    newFeaturedProduct.summary = summary;

    newProduct.name = name;
    newProduct.description = description;
    newProduct.price = price;
    newProduct.summary = summary;

    if (offer) {
      newFeaturedProduct.offer = offer;
      newProduct.offer = offer;
    }

    if (category) {
      newFeaturedProduct.category = category;
      newProduct.category = category;
    }

    await productRepository.merge(findProductById, newProduct);
    // save data in product repository
    newFeaturedProduct.product = await productRepository.save(findProductById);

    featuredProductRepository.merge(
      findFeaturedProductById,
      newFeaturedProduct
    );
    // save data in featured product repository
    await featuredProductRepository.save(findFeaturedProductById);
  } catch (e) {
    return res
      .status(400)
      .json({ errors: [{ msg: "Featured Product could not be updated" }] });
  }

  res.json({ msg: "Featured Product updated" });
}

// @DELETE - /api/v1/featured-products/:featuredProductId&:productId
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

  // collect featured product id
  const id = req.params.featuredProductId;
  // collect associate product id
  const productId = req.params.productId;

  // get the repository from Product entity
  const productRepository = getConnection().getRepository(Product);
  // find product by id
  const productById = await productRepository.findOne({ id: productId });

  // get the repository from FeaturedProduct entity
  const featuredProductRepository = getConnection().getRepository(
    FeaturedProduct
  );
  // find featured product by id
  const featuredProductToUpdate = await featuredProductRepository.findOne({
    id: id,
  });

  if (featuredProductToUpdate && productById) {
    try {
      await featuredProductRepository.delete({ id });
      await productRepository.delete({ id: productId });
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
