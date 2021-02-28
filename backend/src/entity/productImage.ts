import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany } from "typeorm";

import { Product } from "./product";

@Entity("products")
export class ProductImage {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("varchar")
  path!: string;

  @ManyToOne(() => Product, product => product.images)
  product!: Product;
}
