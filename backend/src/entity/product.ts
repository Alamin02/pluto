import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
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

  // @ManyToMany(() => Category)
  // @JoinTable()
  // categories!: Category[];

  // @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  // createdAt!: Date;

  // @Column({
  //   type: "timestamp",
  //   default: () => "CURRENT_TIMESTAMP",
  //   onUpdate: "CURRENT_TIMESTAMP",
  // })
  // updatedAt!: Date;
}
