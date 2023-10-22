import { Request, Response } from 'express';
import CartModel from '../models/cart.model';

export const createCartController = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const cart = new CartModel({ user: userId });

    await cart.save();

    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create a cart' });
  }
};

export const getCartByUserIdController = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const cart = await CartModel.findOne({ user: userId });

    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({ error: 'Cart not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

export const updateCartController = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const updatedCart = req.body;
    const cart = await CartModel.findOneAndUpdate({ user: userId }, updatedCart, { new: true });

    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({ error: 'Cart not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

export const emptyCartController = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const result = await CartModel.deleteOne({ user: userId });

    if (result.deletedCount && result.deletedCount > 0) {
      res.json({ message: 'Cart emptied successfully' });
    } else {
      res.status(404).json({ error: 'Cart not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};
