import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Cart } from './cart.entity';
import { Product } from './product.entity';
import { Order } from './order.entity';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn('uuid')
  id: string = '';

  @Column()
  count: number = 0;

  @ManyToOne(() => Cart, (cart: Cart) => cart.items)
  @JoinColumn({ name: 'cartId' })
  cart!: Cart;

  @ManyToOne(() => Product, (product: Product) => product.cartItems)
  @JoinColumn({ name: 'productId' })
  product!: Product;

  @ManyToOne(() => Order, (order) => order.items)
  @JoinColumn({ name: 'orderId' })
  order!: Order;
}
