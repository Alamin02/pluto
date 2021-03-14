import { ProductImage } from "../entity";
import { getConnection } from "typeorm";

export const productImagesList = [
  {
    path: "public/images/1",
  },
  {
    path: "public/images/2",
  },
];

export async function seedProductImages() {
  const productImageRepository = getConnection().getRepository(ProductImage);

  for (const productImage of productImagesList) {
    const newProductImage = new ProductImage();

    newProductImage.path = productImage.path;

    await productImageRepository.save(newProductImage);
  }
}
