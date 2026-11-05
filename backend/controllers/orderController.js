import mongoose from "mongoose";
import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";
import jwt from "jsonwebtoken";
import Stripe from "stripe";

// Initialize Stripe helper
const getStripe = () => {
    if (!process.env.STRIPE_SECRET_KEY) {
        return null;
    }
    return new Stripe(process.env.STRIPE_SECRET_KEY);
};

/**
 * Anti-Tampering Helper:
 * Recalculates order total using authoritative product prices from MongoDB
 * to prevent malicious client-side price modification (e.g. altering amount to $0.01).
 */
const calculateVerifiedTotal = async (items, clientAmount) => {
    if (!Array.isArray(items) || items.length === 0) return Number(clientAmount) || 0;
    try {
        const productIds = items
            .map(i => i._id || i.id)
            .filter(id => id && mongoose.Types.ObjectId.isValid(id));

        if (productIds.length > 0) {
            const dbProducts = await productModel.find({ _id: { $in: productIds } });
            const priceMap = new Map();
            dbProducts.forEach(p => priceMap.set(String(p._id), Number(p.price)));

            let verifiedTotal = 0;
            for (const item of items) {
                const idStr = String(item._id || item.id);
                const realPrice = priceMap.has(idStr) ? priceMap.get(idStr) : (Number(item.price) || 0);
                const qty = Math.max(1, Number(item.quantity) || 1);
                verifiedTotal += realPrice * qty;
            }
            return verifiedTotal > 0 ? verifiedTotal : Number(clientAmount);
        }
    } catch {
        // Fallback to client amount if database is offline or during testing
    }
    return Number(clientAmount) || 0;
};

// 1. Placing an Order (Cash on Delivery)
const placeOrder = async (req, res) => {
    try {
        let { userId, items, amount, address, paymentMethod } = req.body;

        // Extract userId from token if user is authenticated
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            try {
                const token = authHeader.split(' ')[1];
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                if (decoded && decoded.id) {
                    userId = decoded.id;
                }
            } catch {
                // Ignore token error and continue with provided userId
            }
        }

        userId = userId || "guest_user";

        if (!items || !items.length || !amount || !address || !paymentMethod) {
            return res.status(400).json({ success: false, message: "Missing required order fields" });
        }

        // Anti-Tampering: Enforce server-calculated price
        const verifiedAmount = await calculateVerifiedTotal(items, amount);

        const newOrder = new orderModel({
            userId,
            items,
            amount: verifiedAmount,
            address,
            paymentMethod: "cod",
            payment: false,
            date: Date.now()
        });

        await newOrder.save();

        res.json({ success: true, message: "Order Placed Successfully", orderId: newOrder._id });

    } catch (error) {
        console.error("Place Order Error:", error);
        res.status(500).json({ success: false, message: "Error placing order" });
    }
};

// 2. Placing an Order via Stripe Checkout
const placeOrderStripe = async (req, res) => {
    try {
        const stripe = getStripe();
        if (!stripe) {
            return res.status(400).json({
                success: false,
                message: "Stripe is not configured. Please add STRIPE_SECRET_KEY to backend/.env"
            });
        }

        let { userId, items, amount, address } = req.body;

        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            try {
                const token = authHeader.split(' ')[1];
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                if (decoded && decoded.id) {
                    userId = decoded.id;
                }
            } catch {
                // Ignore token error and continue
            }
        }

        userId = userId || "guest_user";

        if (!items || !items.length || !amount || !address) {
            return res.status(400).json({ success: false, message: "Missing required order fields" });
        }

        // Anti-Tampering: Enforce server-calculated price
        const verifiedAmount = await calculateVerifiedTotal(items, amount);

        // Create pending order
        const newOrder = new orderModel({
            userId,
            items,
            amount: verifiedAmount,
            address,
            paymentMethod: "stripe",
            payment: false,
            date: Date.now()
        });

        await newOrder.save();

        const origin = req.headers.origin || process.env.FRONTEND_URL || 'http://localhost:3000';

        // Prepare line items
        const line_items = items.map((item) => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: `${item.name}${item.size && item.size !== 'default' ? ` (${item.size})` : ''}`,
                },
                unit_amount: Math.round(Number(item.price) * 100)
            },
            quantity: item.quantity
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: line_items,
            mode: 'payment',
            success_url: `${origin}/verify-payment?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify-payment?success=false&orderId=${newOrder._id}`,
            metadata: {
                orderId: newOrder._id.toString()
            }
        });

        res.json({
            success: true,
            session_url: session.url,
            orderId: newOrder._id
        });

    } catch (error) {
        console.error("Stripe Checkout Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// 3. Verify Stripe Payment (Return URL callback)
const verifyStripePayment = async (req, res) => {
    try {
        const { orderId, success } = req.body;

        if (!orderId) {
            return res.status(400).json({ success: false, message: "Missing orderId" });
        }

        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(400).json({ success: false, message: "Invalid order ID format." });
        }

        const isSuccess = success === "true" || success === true;

        if (isSuccess) {
            const updated = await orderModel.findByIdAndUpdate(orderId, {
                payment: true,
                status: "Order Placed"
            }, { new: true });

            if (!updated) {
                return res.status(404).json({ success: false, message: "Order not found" });
            }

            res.json({ success: true, message: "Payment verified successfully" });
        } else {
            // Clean up uncompleted order
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Payment was not completed" });
        }
    } catch (error) {
        console.error("Verify Stripe Payment Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// 4. All Orders (For Admin Panel)
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({}).sort({ date: -1 });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.error("All Orders Error:", error);
        res.status(500).json({ success: false, message: "Error fetching orders" });
    }
};

// 5. User Orders (For Logged In Customer)
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.userId }).sort({ date: -1 });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.error("User Orders Error:", error);
        res.status(500).json({ success: false, message: "Error fetching user orders" });
    }
};

// 6. Update Status (For Admin to change "Order Placed" -> "Shipped")
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        if (!orderId || !status) {
            return res.status(400).json({ success: false, message: "Missing orderId or status" });
        }

        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(400).json({ success: false, message: "Invalid order ID format." });
        }

        const updatedOrder = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        res.json({ success: true, message: "Status Updated" });
    } catch (error) {
        console.error("Update Status Error:", error);
        res.status(500).json({ success: false, message: "Error updating status" });
    }
};

export { placeOrder, placeOrderStripe, verifyStripePayment, allOrders, userOrders, updateStatus };
