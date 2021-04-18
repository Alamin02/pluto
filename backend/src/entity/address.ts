import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";

import { User, Order } from "../entity";

@Entity("addresses")
export class Address {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("varchar")
  division!: string;

  @Column("varchar")
  district!: string;

  @Column("varchar")
  city!: String;

  @Column({ type: "text", unique: true })
  address!: string;

  @ManyToOne(() => User, (user) => user.addresses, { onDelete: "CASCADE" })
  user!: User;

  @OneToMany(() => Order, (order) => order.address)
  orders!: Order[];
}
