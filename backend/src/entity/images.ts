import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Carousel } from "./carousel";
import { FeaturedProduct } from "./featuredProduct";
@Entity("images")
export class Image {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("varchar")
  path!: string;

  @Column("varchar")
  originalname!: string;

  @OneToOne(() => Carousel, (carousel) => carousel.image, {
    onDelete: "CASCADE",
  })
  carousel!: Carousel;

  @OneToOne(() => FeaturedProduct, (featuredproduct) => featuredproduct.image, {
    onDelete: "CASCADE",
  })
  featuredProduct!: FeaturedProduct;
}
