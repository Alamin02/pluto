import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("settings")
export class Settings {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", unique: true })
  key!: string;

  @Column("varchar")
  value!: string;
}
