import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Offer } from "../entity"


@Entity()
export class OfferImage {

  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("varchar")
  originalname!: string;

  @Column("varchar")
  path!: string;

  @ManyToOne(() => Offer, (offer) => offer.offerImage)
  offer!: Offer;
}