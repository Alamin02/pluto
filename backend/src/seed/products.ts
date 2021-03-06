import { getConnection } from "typeorm";
import { Product } from "../entity";

const productList = [
  {
    name: "x",
    price: 10,
    summary: "abc",
    description: "xyz"
  },
  {
    name: "y",
    price: 10,
    summary: "abc",
    description: "xyz"
  }
];

export async function seedProducts() {
  const productRepository = getConnection().getRepository(Product);

  for(const product of productList){
    const newProduct = new Product();

    newProduct.name = product.name;
    newProduct.price = product.price;
    newProduct.summary = product.summary;
    newProduct.description = product.description;
    
    await productRepository.save(newProduct);
  }
}