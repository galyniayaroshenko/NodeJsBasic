import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Cart } from '../entities/cart.entity';
import { cartSchema } from '../utils/validation';

const cartRepository = getRepository(Cart);

export const createCartController = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const cart = cartRepository.create({ user: { id: userId } });

    await cartRepository.save(cart);

    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create a cart' });
  }
};

export const getCartByUserIdController = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.userId;
    const cartRepository = getRepository(Cart);

    // Using QueryBuilder to find the cart by user ID
    const cart = await cartRepository
      .createQueryBuilder('cart')
      .where('cart.userId = :userId', { userId })
      .getOne();

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
    const cartRepository = getRepository(Cart);

    const { error } = cartSchema.validate(updatedCart);

    if (error) {
      return res.status(400).json({ error: error.details.map((detail) => detail.message) });
    }

    // Using QueryBuilder to find the cart by user ID
    const cart = await cartRepository
      .createQueryBuilder('cart')
      .where('cart.userId = :userId', { userId })
      .getOne();

    if (cart) {
      cart.isDeleted = updatedCart.isDeleted;
      cart.user = updatedCart.user;
      cart.items = updatedCart.items;
      await cartRepository.save(cart);

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
    const cartRepository = getRepository(Cart);

    // Using QueryBuilder to find the cart by user ID
    const cart = await cartRepository
      .createQueryBuilder('cart')
      .where('cart.userId = :userId', { userId })
      .getOne();

    if (cart) {
      await cartRepository.remove(cart);

      res.json({ message: 'Cart emptied successfully' });
    } else {
      res.status(404).json({ error: 'Cart not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};
