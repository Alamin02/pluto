import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("settings")
export class Setting {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", unique: true })
  parameter!: string;

  @Column("varchar")
  value!: string;
}
