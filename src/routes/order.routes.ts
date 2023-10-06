import express from 'express';
import * as orderController from '../controllers/order.controller';
import { authenticateUser } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/', orderController.createOrder);
router.get('/:userId', authenticateUser, orderController.getOrdersByUserId);
router.get('/:orderId', orderController.getOrderById);

export default router;
