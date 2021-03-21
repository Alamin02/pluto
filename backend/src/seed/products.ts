// import { getConnection } from "typeorm";
// import { Product, ProductImage, OrderedProduct } from "../entity";
// import { productImagesList } from "./productImages";
// import { orderedProductsList } from "./orderedProducts";

// const productList = [
//   {
//     name: "x",
//     price: 10,
//     summary: "abc",
//     description: "xyz",
//   },
//   {
//     name: "y",
//     price: 10,
//     summary: "abc",
//     description: "xyz",
//   },
// ];

// export async function seedProducts() {
//   const productRepository = getConnection().getRepository(Product);
//   const productImageRepository = getConnection().getRepository(ProductImage);
//   const orderedProductRepository = getConnection().getRepository(
//     OrderedProduct
//   );

//   for (const product of productList) {
//     const newProduct = new Product();

//     newProduct.name = product.name;
//     newProduct.price = product.price;
//     newProduct.summary = product.summary;
//     newProduct.description = product.description;

//     const createProductImages = [];
//     const creatOrderProducts = [];

//     for (const productImage of productImagesList) {
//       const newProductImages = new ProductImage();

//       newProductImages.path = productImage.path;

//       await productImageRepository.save(newProductImages);
//       createProductImages.push(newProductImages);
//     }
//     newProduct.images = createProductImages;

//     for (const orderProduct of orderedProductsList) {
//       const newOrderProducts = new OrderedProduct();

//       newOrderProducts.quantity = orderProduct.quantity;

//       await orderedProductRepository.save(newOrderProducts);
//       creatOrderProducts.push(newOrderProducts);
//     }
//     newProduct.orderedProducts = creatOrderProducts;

//     await productRepository.save(newProduct);
//   }
// }

import faker from "faker";
import { getConnection } from "typeorm";
import { connectDatabase } from "../utils/connect-db";
import { Product, ProductImage } from "../entity";

interface FakeProductInterface {
  name: string;
  price: number;
  description: string;
  summary: string;
  images: string[];
}

const productList: FakeProductInterface[] = [];

for (let i = 0; i <= 100; i++) {
  const name = faker.commerce.productName();
  const price = parseFloat(faker.commerce.price());
  const description = faker.commerce.productDescription();
  const summary = faker.commerce.productDescription();
  const images = [
    faker.image.animals(),
    faker.image.cats(),
    faker.image.food(),
    faker.image.fashion(),
  ];

  productList.push({
    name,
    price,
    description,
    summary,
    images,
  });
}

const seedProducts = async () => {
  await connectDatabase();

  const productRepository = getConnection().getRepository(Product);
  const productImageRepository = getConnection().getRepository(ProductImage);

  for (const product of productList) {
    const newProduct = new Product();

    newProduct.name = product.name;
    newProduct.price = product.price;
    newProduct.description = product.description;
    newProduct.summary = product.summary;

    const savedNewProduct = await productRepository.save(newProduct);

    for (const image of product.images) {
      const newProductImage = new ProductImage();
      newProductImage.path = image;
      newProductImage.originalname = image;
      newProductImage.product = savedNewProduct;

      await productImageRepository.save(newProductImage);
    }
  }
};

seedProducts().then(() => {
  console.log("Seeding successful");
});
