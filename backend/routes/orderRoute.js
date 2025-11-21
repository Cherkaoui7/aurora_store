import express from 'express'
import { placeOrder, allOrders, updateStatus } from '../controllers/orderController.js'

const orderRouter = express.Router();

// Admin Features
orderRouter.get('/list', allOrders);
orderRouter.post('/status', updateStatus);

// Customer Features
orderRouter.post('/place', placeOrder);

export default orderRouter;