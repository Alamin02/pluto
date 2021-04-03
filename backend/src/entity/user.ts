import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

import { Order, Address } from "../entity";

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
  role!: string;

  @Column("varchar", { select: false })
  password!: string;

  @OneToMany(() => Order, (order) => order.user)
  orders!: Order[];

  @OneToMany(() => Address, (address) => address.user)
  addresses!: Address[];
}
