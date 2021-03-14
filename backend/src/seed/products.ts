import { getConnection } from "typeorm";
import { Product, ProductImage, OrderedProduct } from "../entity";
import { productImagesList } from "./productImages";
import { orderedProductsList } from "./orderedProducts";

const productList = [
  {
    name: "x",
    price: 10,
    summary: "abc",
    description: "xyz",
  },
  {
    name: "y",
    price: 10,
    summary: "abc",
    description: "xyz",
  },
];

export async function seedProducts() {
  const productRepository = getConnection().getRepository(Product);
  const productImageRepository = getConnection().getRepository(ProductImage);
  const orderedProductRepository = getConnection().getRepository(
    OrderedProduct
  );

  for (const product of productList) {
    const newProduct = new Product();

    newProduct.name = product.name;
    newProduct.price = product.price;
    newProduct.summary = product.summary;
    newProduct.description = product.description;

    const createProductImages = [];
    const creatOrderProducts = [];

    for (const productImage of productImagesList) {
      const newProductImages = new ProductImage();

      newProductImages.path = productImage.path;

      await productImageRepository.save(newProductImages);
      createProductImages.push(newProductImages);
    }
    newProduct.images = createProductImages;

    for (const orderProduct of orderedProductsList) {
      const newOrderProducts = new OrderedProduct();

      newOrderProducts.quantity = orderProduct.quantity;

      await orderedProductRepository.save(newOrderProducts);
      creatOrderProducts.push(newOrderProducts);
    }
    newProduct.orderedProducts = creatOrderProducts;

    await productRepository.save(newProduct);
  }
}
