import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Product } from "../entity";
@Entity("offers")
export class Offer {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", unique: true })
  name!: string;

  @Column("float")
  discount!: number;

  @Column("text")
  description!: string;

  @OneToMany(() => Product, (product) => product.offer)
  products!: Product[];
}
