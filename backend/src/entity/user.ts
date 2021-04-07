import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

import { Order, Address, UserImage } from "../entity";

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

  @Column("varchar")
  password!: string;

  @OneToMany(() => UserImage, (userImage) => userImage.user)
  image!: UserImage[];

  @OneToMany(() => Order, (order) => order.user)
  orders!: Order[];

  @OneToMany(() => Address, (address) => address.user)
  addresses!: Address[];
}
