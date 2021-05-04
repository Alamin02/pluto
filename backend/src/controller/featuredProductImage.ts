import express = require("express");
import { getConnection } from "typeorm";
import {
  FeaturedProductImage,
  FeaturedProduct,
  Product,
  ProductImage,
} from "../entity";

// @POST //v1/api/images/:featuredProductId
// create featured product image
export async function createFeaturedProductImage(
  req: express.Request,
  res: express.Response
) {
  // collect featured image id
  const id = req.body.imageId;
  // collect product id
  const productId = req.body.productId;

  // get the repository from Product entity
  const productRepository = getConnection().getRepository(Product);
  const findProductById = await productRepository.findOneOrFail({
    id: productId,
  });

  // get the repository from FeaturedProduct entity
  const featuredProductRepository = getConnection().getRepository(
    FeaturedProduct
  );
  const featuredProductById = await featuredProductRepository.findOne({ id });

  // get the repository from FeaturedProductImage entity
  const featuredProductImageRepository = getConnection().getRepository(
    FeaturedProductImage
  );
  // get the repository from ProductImage entity
  const productImageRepository = getConnection().getRepository(ProductImage);

  const createProductImage = [];
  const createFeaturedProductImage = [];
  const files = req.files as Express.Multer.File[];

  if (files.length && featuredProductById) {
    for (let i = 0; i < files.length; i++) {
      const featuredProductImage = new FeaturedProductImage();
      const productImage = new ProductImage();
      featuredProductImage.path = files[i].path;
      featuredProductImage.originalname = files[i].originalname;
      featuredProductImage.featuredProduct = featuredProductById;

      productImage.path = files[i].path;
      productImage.originalname = files[i].originalname;
      productImage.product = findProductById;

      // save image in featuredProductImage entity
      const savedFeaturedProductImage = await featuredProductImageRepository.save(
        featuredProductImage
      );
      createFeaturedProductImage.push(savedFeaturedProductImage);

      // save image in product image entity
      const savedProductImage = await productImageRepository.save(productImage);
      createProductImage.push(savedProductImage);
    }

    res.json({ msg: "Image added" });
  } else {
    return res.status(400).json({ errors: [{ msg: "Image not found" }] });
  }
}

// @GET /v1/api/images
// all featured products images
export async function getAllFeaturedProductsImages(
  req: express.Request,
  res: express.Response
) {
  const featuredProductImageRepository = getConnection().getRepository(
    FeaturedProductImage
  );
  const allFeaturedProductsImages = await featuredProductImageRepository.find();
  res.status(200).json({ data: allFeaturedProductsImages });
}

// @GET /v1/api/images/:imageId
// Get a particular featured product image
export async function getSingleFeaturedProductImage(
  req: express.Request,
  res: express.Response
) {
  const id = req.params.imageId;

  const featuredProductImageRepository = getConnection().getRepository(
    FeaturedProductImage
  );

  const findFeaturedProductImageById = await featuredProductImageRepository.findOne(
    { id }
  );

  if (!findFeaturedProductImageById) {
    return res.status(400).json({ errors: [{ msg: "Image not found" }] });
  }

  res.json({ msg: "Image found", data: findFeaturedProductImageById });
}

// @DELETE /v1/api/images/:originalName/:imageId/:productId
// delete a image
export async function deleteFeaturedProductImage(
  req: express.Request,
  res: express.Response
) {
  // collect image id
  const Id = req.params.imageId;
  // collect product id
  const ProductId = req.params.productId;
  // file name
  const originalName = req.params.originalName;

  // get repository from product entity
  const productRepository = getConnection().getRepository(Product);
  // get product by id
  const productById = await productRepository.findOne(
    { id: ProductId },
    { relations: ["images"] }
  );
  // get repository from product image entity
  const productImageRepository = getConnection().getRepository(ProductImage);

  // get reposity from featured product image entity
  const featuredProductImageRepository = getConnection().getRepository(
    FeaturedProductImage
  );
  // find image by id
  const featuredProductImageToUpdate = await featuredProductImageRepository.findOne(
    { id: Id }
  );

  if (featuredProductImageToUpdate && productById) {
    try {
      // image delete from featured product image repository
      await featuredProductImageRepository.delete(Id);
      // image delete from product image repository
      const updateProductImage = productById.images.filter(async (image) => {
        if (image.originalname === originalName) {
          await productImageRepository.delete(image.id);
        }
      });
      res.json({ msg: "image deleted" });
    } catch (e) {
      res.status(400).json({ msg: e });
    }
  } else {
    res.status(400).json({
      errors: [
        { msg: "Featured Product image to delete not found or invalid id" },
      ],
    });
  }
}
