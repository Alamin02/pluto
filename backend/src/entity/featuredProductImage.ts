import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";

import { FeaturedProduct } from "../entity";

@Entity("featuredProductImages")
export class FeaturedProductImage {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("varchar")
  originalName!: string;

  @Column("varchar")
  path!: string;

  @OneToOne(() => FeaturedProduct, (featuredProduct) => featuredProduct.image, {
    onDelete: "CASCADE",
  })
  featuredProduct!: FeaturedProduct;
  save: any;
}
