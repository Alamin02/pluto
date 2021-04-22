import { Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";

import { FeaturedProductImage } from "../entity";

@Entity("featuredProducts")
export class FeaturedProduct {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @OneToMany(
    () => FeaturedProductImage,
    (featuredProductImage) => featuredProductImage.featuredProduct,
    {
      onDelete: "CASCADE",
    }
  )
  images!: FeaturedProductImage[];
}
