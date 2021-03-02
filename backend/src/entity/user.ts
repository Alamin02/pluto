import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

import { Order } from "../entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("varchar")
  name!: string;

  @Column({ type: "varchar", unique: true })
  email!: string;

  @Column("varchar")
  phone!: string;

  @Column("varchar")
  password!: string;

  @OneToMany(() => Order, (order) => order.user)
  orders!: Order[];
}
