import { OrderEntity, order } from '../models/order.model';

const orders: OrderEntity[] = [order];

export class OrderService {
  createOrder(order: OrderEntity): void {
    orders.push(order);
  }

  getOrdersByUserId(userId: string): OrderEntity[] {
    return orders.filter((order) => order.userId === userId);
  }

  getOrderById(id: string): OrderEntity | undefined {
    return orders.find((order) => order.id === id);
  }
}