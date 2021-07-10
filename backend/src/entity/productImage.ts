import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

import { Product } from "../entity";

@Entity("productImages")
export class ProductImage {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("varchar")
  originalname!: string;

  @Column("varchar")
  path!: string;

  @ManyToOne(() => Product, (product) => product.productImage, {
    onDelete: "CASCADE",
  })
  product!: Product;
}
