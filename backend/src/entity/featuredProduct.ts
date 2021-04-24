import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
} from "typeorm";

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

  @CreateDateColumn({
    type: "date",
  })
  createdAt!: Date;
}
