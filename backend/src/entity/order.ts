import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from "typeorm";

import { User, Address, OrderedProduct } from "../entity";

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User, (user) => user.orders)
  user!: User;

  @OneToMany(() => OrderedProduct, (orderedProduct) => orderedProduct.order)
  orderedProducts!: OrderedProduct[];

  @Column("varchar")
  status!: string;

  @Column("varchar")
  paymentMethod!: string;

  @ManyToOne(() => Address, (address) => address.orders)
  address!: Address;
}
