import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";

// import { Product } from "./product";

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("varchar")
  name!: string;

  @ManyToOne((type) => Category, (category) => category.children)
  parent!: Category;

  @OneToMany((type) => Category, (category) => category.parent)
  children!: Category[];

  //   @ManyToMany(() => Product)
  //   @JoinTable()
  //   products!: Product[];

  //   @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  //   createdAt!: Date;

  //   @Column({
  //     type: "timestamp",
  //     default: () => "CURRENT_TIMESTAMP",
  //     onUpdate: "CURRENT_TIMESTAMP",
  //   })
  //   updatedAt!: Date;
}
