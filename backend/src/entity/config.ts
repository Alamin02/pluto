import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("configs")
export class Config {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", unique: true })
  parameter!: string;

  @Column("varchar")
  value!: string;
}
