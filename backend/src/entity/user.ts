import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @Column('varchar')
  name!: string;

  @Column({ type: 'varchar', unique: true })
  email!: string;

  @Column('varchar')
  phone!: string;

  @Column('varchar')
  password!: string;
}
