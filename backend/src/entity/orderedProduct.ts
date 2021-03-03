import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import { Product, Order } from '../entity';

@Entity('ordered_products')
export class OrderedProduct {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Product, (product) => product.orderedProducts)
  product!: Product;

  @Column('integer')
  quantity!: number;

  @ManyToOne(() => Order, (order) => order.orderedProducts)
  order!: Order;
}
