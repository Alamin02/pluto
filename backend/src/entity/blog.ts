import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";


@Entity("blogs")
export class Blog {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", unique: true })
  title!: string;

  @Column({type: "varchar"})
  author!: string;

  @Column("text")
  description!: String;

}
