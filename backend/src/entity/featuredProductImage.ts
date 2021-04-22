import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

import { FeaturedProduct } from ".";

@Entity("featuredProductImages")
export class FeaturedProductImage {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("varchar")
  title!: string;

  @Column("varchar")
  originalname!: string;

  @Column("varchar")
  path!: string;

  @ManyToOne(
    () => FeaturedProduct,
    (featuredProduct) => featuredProduct.images,
    {
      onDelete: "CASCADE",
    }
  )
  featuredProduct!: FeaturedProduct;
}
