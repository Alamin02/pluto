import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";

import { Carousel } from "../entity";

@Entity("carouselImages")
export class CarouselImage {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("varchar")
  originalName!: string;

  @Column("varchar")
  path!: string;

  @OneToOne(() => Carousel, (carousel) => carousel.image, {
    onDelete: "CASCADE",
  })
  carousel!: Carousel;
  save: any;
}
