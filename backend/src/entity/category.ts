import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Product } from "./product";

// import { Product } from "./product";

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("varchar")
  name!: string;

  @ManyToOne((type) => Category, (category) => category.children, {
    onDelete: "CASCADE",
  })
  parent!: Category;

  @OneToMany((type) => Category, (category) => category.parent, {
    cascade: true,
  })
  children!: Category[];

  @OneToMany((type) => Product, (product) => product.category)
  products!: Product[];

  //   @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  //   createdAt!: Date;

  //   @Column({
  //     type: "timestamp",
  //     default: () => "CURRENT_TIMESTAMP",
  //     onUpdate: "CURRENT_TIMESTAMP",
  //   })
  //   updatedAt!: Date;
}
