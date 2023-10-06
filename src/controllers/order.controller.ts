import { Request, Response } from 'express';
import { OrderService } from '../services/order.service';

const orderService = new OrderService();

export const createOrder = (req: Request, res: Response): void => {
  const order = req.body;
  orderService.createOrder(order);
  res.status(201).json({ message: 'Order created successfully' });
};

export const getOrdersByUserId = (req: Request, res: Response): void => {
  const userId = req.params.userId;
  const orders = orderService.getOrdersByUserId(userId);
  res.json(orders);
};

export const getOrderById = (req: Request, res: Response): void => {
  const orderId = req.params.orderId;
  const order = orderService.getOrderById(orderId);
  if (!order) {
    res.status(404).json({ message: 'Order not found' });
  } else {
    res.json(order);
  }
};
