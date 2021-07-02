import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from "typeorm";
import { Product, OfferImage } from "../entity";
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

  @OneToMany(() => OfferImage, (offerImage) => offerImage.offer)
  @JoinColumn()
  offerImage!: OfferImage[];
}
