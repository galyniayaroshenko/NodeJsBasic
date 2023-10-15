import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CartItem } from './cart-item.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string = '';

  @Column()
  title: string = '';

  @Column()
  description: string = '';

  @Column('decimal', { precision: 10, scale: 2 })
  price: number = 0;

  @OneToMany(() => CartItem, (cartItem) => cartItem.product)
  cartItems!: CartItem[];
}
