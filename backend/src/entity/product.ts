import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from "typeorm";
import { Category, ProductImage, OrderedProduct } from "../entity";

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

  @OneToMany(() => OrderedProduct, (orderedProduct) => orderedProduct.product)
  orderedProducts!: OrderedProduct[];

  @ManyToOne(() => Category, (category) => category.products)
  category!: Category;

  // @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  // createdAt!: Date;

  // @Column({
  //   type: "timestamp",
  //   default: () => "CURRENT_TIMESTAMP",
  //   onUpdate: "CURRENT_TIMESTAMP",
  // })
  // updatedAt!: Date;
}
