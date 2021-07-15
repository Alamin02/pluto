import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";

import { FeaturedProductImage, Image } from "../entity";

@Entity("featuredProducts")
export class FeaturedProduct {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar" })
  title!: string;

  @Column("varchar")
  productId!: string;

  // @OneToOne(
  //   () => FeaturedProductImage,
  //   (featuredProductImage) => featuredProductImage.featuredProduct,
  //   {
  //     onDelete: "CASCADE",
  //   }
  // )
  // @JoinColumn()
  // image!: FeaturedProductImage;
  @OneToOne(() => Image, (image) => image.featuredProduct, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  image!: Image;
}
