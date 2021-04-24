import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  Column,
  ManyToOne,
} from "typeorm";

import {
  FeaturedProductImage,
  Offer,
  OrderedProduct,
  Category,
} from "../entity";

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

  @ManyToOne(() => Offer, (offer) => offer.products, { onDelete: "CASCADE" })
  offer!: Offer;

  @OneToMany(() => OrderedProduct, (orderedProduct) => orderedProduct.product)
  orderedProducts!: OrderedProduct[];

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: "CASCADE",
  })
  category!: Category;

  @CreateDateColumn({
    type: "date",
  })
  createdAt!: Date;
}
