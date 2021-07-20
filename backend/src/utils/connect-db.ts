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
  OfferImage,
  Carousel,
  CarouselImage,
  FeaturedProduct,
  FeaturedProductImage,
  Image,
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
      OfferImage,
      Carousel,
      CarouselImage,
      FeaturedProduct,
      FeaturedProductImage,
      Image,
    ],
    synchronize: true,
  });
}

// synchronize: true is important for high availability
