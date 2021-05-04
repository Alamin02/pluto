import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  ManyToOne,
  OneToOne,
} from "typeorm";

import {
  Category,
  ProductImage,
  OrderedProduct,
  Offer,
  FeaturedProduct,
} from "../entity";

@Entity("products")
export class Product {
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

  @OneToMany(() => ProductImage, (productImage) => productImage.product)
  images!: ProductImage[];

  @ManyToOne(() => Offer, (offer) => offer.products, { onDelete: "CASCADE" })
  offer!: Offer;

  @OneToMany(() => OrderedProduct, (orderedProduct) => orderedProduct.product)
  orderedProducts!: OrderedProduct[];

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: "CASCADE",
  })
  category!: Category;

  @OneToOne(
    () => FeaturedProduct,
    (featuredProduct) => featuredProduct.product,
    {
      onDelete: "CASCADE",
    }
  )
  featuredProduct!: FeaturedProduct;

  @CreateDateColumn({
    type: "date",
    // default: () => "CURRENT_TIMESTAMP",
    // onUpdate: "CURRENT_TIMESTAMP",
  })
  createdAt!: Date;
}
