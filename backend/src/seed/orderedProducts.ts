import { OrderedProduct } from "../entity";
import { getConnection } from "typeorm";

export const orderedProductsList = [
  {
    quantity: 4,
  },
  {
    quantity: 5,
  },
];

export async function seedOrderedProducts() {
  const orderedProductRepository = getConnection().getRepository(
    OrderedProduct
  );

  for (const orderProduct of orderedProductsList) {
    const newOrderedProduct = new OrderedProduct();

    newOrderedProduct.quantity = orderProduct.quantity;

    await orderedProductRepository.save(newOrderedProduct);
  }
}
