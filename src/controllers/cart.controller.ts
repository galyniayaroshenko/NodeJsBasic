import { Request, Response } from 'express';
import { createCart, getCartByUserId, updateCart, emptyCart } from '../services/cart.service';
import { cartSchema } from '../utils/validation';

export const createCartController = (req: Request, res: Response) => {
  const userId = req.params.userId;

  try {
    const cart = createCart(userId);
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create a cart' });
  }
};

export const getCartByUserIdController = (req: Request, res: Response) => {
  const userId = req.params.userId;

  const cart = getCartByUserId(userId);

  if (cart) {
    res.json(cart);
  } else {
    res.status(404).json({ error: 'Cart not found' });
  }
};

export const updateCartController = (req: Request, res: Response) => {
  const userId = req.params.userId;
  const updatedCart = req.body;

  const { error } = cartSchema.validate(updatedCart);

  if (error) {
    return res.status(400).json({ error: error.details.map((detail) => detail.message) });
  }

  const cart = updateCart(userId, updatedCart);

  if (cart) {
    res.json(cart);
  } else {
    res.status(404).json({ error: 'Cart not found' });
  }
};

export const emptyCartController = (req: Request, res: Response) => {
  const userId = req.params.userId;

  if (emptyCart(userId)) {
    res.json({ message: 'Cart emptied successfully' });
  } else {
    res.status(404).json({ error: 'Cart not found' });
  }
};
