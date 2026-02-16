import express from 'express'
import { placeOrder, allOrders, updateStatus } from '../controllers/orderController.js'
import authMiddleware from '../middleware/auth.js'

const orderRouter = express.Router();

// Admin Features (Protected)
orderRouter.get('/list', authMiddleware, allOrders);
orderRouter.post('/status', authMiddleware, updateStatus);

// Customer Features
orderRouter.post('/place', placeOrder);

export default orderRouter;