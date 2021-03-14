import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  OneToMany,
  ManyToOne,
} from "typeorm";

import { Product, Order } from "../entity";

@Entity("ordered_products")
export class OrderedProduct {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Product, (product) => product.orderedProducts, {
    onDelete: "CASCADE",
  })
  product!: Product;

  @Column("integer")
  quantity!: number;

  @ManyToOne(() => Order, (order) => order.orderedProducts, {
    onDelete: "CASCADE",
  })
  order!: Order;
}
