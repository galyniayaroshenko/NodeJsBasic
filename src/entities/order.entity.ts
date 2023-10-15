import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { CartItem } from './cart-item.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string = '';

  @Column()
  comments: string = '';

  @Column('decimal', { precision: 10, scale: 2 })
  total: number = 0;

  @Column()
  status: string = '';

  @ManyToOne(() => User, (user: User) => user.orders)
  @JoinColumn({ name: 'userId' })
  user!: User;

  @OneToMany(() => CartItem, (cartItem: CartItem) => cartItem.order)
  items!: CartItem[];
}
