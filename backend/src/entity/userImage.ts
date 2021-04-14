import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
} from "typeorm";

import { User } from "../entity";

@Entity("userImages")
export class UserImage {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("varchar")
  originalname!: string;

  @Column("varchar")
  path!: string;

  @OneToOne(() => User, (user) => user.image, {
    onDelete: "CASCADE",
  })
  user!: User;
}
