import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Order } from '../entities/order.entity';

const orderRepository = getRepository(Order);

export const createOrder = async (req: Request, res: Response): Promise<void> => {
  const orderData = req.body;

  try {
    const newOrder = orderRepository.create(orderData);
    await orderRepository.save(newOrder);

    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error: any) {
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
};

export const getOrdersByUserId = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.userId;

  try {
    const orders = await orderRepository
      .createQueryBuilder('order') // Start a query builder for the 'Order' entity
      .where('order.userId = :userId', { userId }) // Add a where condition
      .getMany(); // Execute the query and get the result

    res.json(orders);
  } catch (error: any) {
    res.status(500).json({ message: 'Error retrieving orders', error: error.message });
  }
};

export const getOrderById = async (req: Request, res: Response): Promise<void> => {
  const orderId = req.params.orderId;

  try {
    const order = await orderRepository.findOneById(orderId);

    if (!order) {
      res.status(404).json({ message: 'Order not found' });
    } else {
      res.json(order);
    }
  } catch (error: any) {
    res.status(500).json({ message: 'Error retrieving order', error: error.message });
  }
};
