import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Product, FeaturedProduct } from "../entity";

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

  @OneToMany(
    (type) => FeaturedProduct,
    (featuredProduct) => featuredProduct.category
  )
  featuredProducts!: FeaturedProduct[];
}
