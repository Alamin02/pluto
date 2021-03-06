import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";

import { CarouselImage, Image } from "../entity";

@Entity("carousels")
export class Carousel {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar" })
  title!: string;

  @Column("text")
  summary!: string;

  @Column("varchar")
  link!: string;

  // @OneToOne(() => CarouselImage, (carouselImage) => carouselImage.carousel, {
  //   onDelete: "CASCADE",
  // })
  // @JoinColumn()
  // image!: CarouselImage;

  @OneToOne(() => Image, (image) => image.carousel, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  image!: Image;
}
