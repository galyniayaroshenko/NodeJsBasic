import express from 'express';
import {
  createCartController,
  getCartByUserIdController,
  updateCartController,
  emptyCartController,
} from '../controllers/cart.controller';

const router = express.Router();

// Create a new cart for a user
router.post('/:userId', createCartController);

// Get the cart for a user
router.get('/:userId', getCartByUserIdController);

// Update the cart for a user
router.put('/:userId', updateCartController);

// Empty the cart for a user
router.delete('/:userId', emptyCartController);

export default router;