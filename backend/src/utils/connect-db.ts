import { createConnection } from "typeorm";

import {
  User,
  Product,
  Blog,
  ProductImage,
  Offer,
  Order,
  OrderedProduct,
  Category,
  Address,
  UserImage,
  OfferImage
} from "../entity";

export function connectDatabase() {
  return createConnection({
    type: "sqlite",
    database: "./db.sqlite",
    entities: [
      User,
      Product,
      Blog,
      ProductImage,
      Offer,
      Category,
      Order,
      OrderedProduct,
      Address,
      UserImage,
      OfferImage
    ],
    synchronize: true,
  });
}
