import { Request, Response } from 'express';
import OrderModel from '../models/order.model';

export const createOrder = async (req: Request, res: Response) => {
  const orderData = req.body;

  try {
    const newOrder = new OrderModel(orderData);
    await newOrder.save();

    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error: any) {
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
};

export const getOrdersByUserId = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  try {
    const orders = await OrderModel.find({ userId });

    res.json(orders);
  } catch (error: any) {
    res.status(500).json({ message: 'Error retrieving orders', error: error.message });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  const orderId = req.params.orderId;

  try {
    const order = await OrderModel.findById(orderId);

    if (!order) {
      res.status(404).json({ message: 'Order not found' });
    } else {
      res.json(order);
    }
  } catch (error: any) {
    res.status(500).json({ message: 'Error retrieving order', error: error.message });
  }
};
