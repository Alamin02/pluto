import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

import { Product } from "./product";

@Entity("productImages")
export class ProductImage {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("varchar")
  path!: string;

  @ManyToOne(() => Product, (product) => product.images)
  product!: Product;
}
