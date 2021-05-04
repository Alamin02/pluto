import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  Column,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { Product, FeaturedProductImage, Offer, Category } from "../entity";

@Entity("featuredProducts")
export class FeaturedProduct {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", unique: true })
  name!: string;

  @Column("float")
  price!: number;

  @Column("text")
  summary!: String;

  @Column("text")
  description!: string;

  @OneToMany(
    () => FeaturedProductImage,
    (featuredProductImage) => featuredProductImage.featuredProduct
  )
  images!: FeaturedProductImage[];

  @ManyToOne(() => Category, (category) => category.featuredProducts, {
    onDelete: "CASCADE",
  })
  category!: Category;

  @ManyToOne(() => Offer, (offer) => offer.featuredProducts, {
    onDelete: "CASCADE",
  })
  offer!: Offer;

  @OneToOne(() => Product, (product) => product.featuredProduct, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  product!: Product;

  @CreateDateColumn({
    type: "date",
  })
  createdAt!: Date;
}
