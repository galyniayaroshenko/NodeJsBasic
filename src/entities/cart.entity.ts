import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { CartItem } from './cart-item.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string = '';

  @Column()
  isDeleted: boolean = false;

  @ManyToOne(() => User, (user: User) => user.carts)
  @JoinColumn({ name: 'userId' })
  user!: User;

  @OneToMany(() => CartItem, (cartItem: CartItem) => cartItem.cart)
  items!: CartItem[];
}
