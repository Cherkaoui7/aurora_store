import express from 'express';
import {
    placeOrder,
    placeOrderStripe,
    verifyStripePayment,
    allOrders,
    userOrders,
    updateStatus
} from '../controllers/orderController.js';
import authMiddleware from '../middleware/auth.js';
import adminAuth from '../middleware/adminAuth.js';

const orderRouter = express.Router();

// Admin Features (Protected strictly for Admins)
orderRouter.get('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateStatus);

// Customer Features
orderRouter.post('/place', placeOrder);
orderRouter.post('/stripe', placeOrderStripe);
orderRouter.post('/verify-stripe', verifyStripePayment);
orderRouter.get('/userorders', authMiddleware, userOrders);

export default orderRouter;
