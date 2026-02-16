import orderModel from "../models/orderModel.js";

// 1. Placing an Order (Cash on Delivery method for now)
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address, paymentMethod } = req.body;

        if (!userId || !items || !amount || !address || !paymentMethod) {
            return res.status(400).json({ success: false, message: "Missing required order fields" });
        }

        const newOrder = new orderModel({
            userId,
            items,
            amount,
            address,
            paymentMethod,
            payment: false,
            date: Date.now()
        })

        await newOrder.save();

        res.json({ success: true, message: "Order Placed Successfully" })

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error placing order" })
    }
}

// 2. All Orders (For Admin Panel)
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders })
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error fetching orders" })
    }
}

// 3. Update Status (For Admin to change "Order Placed" -> "Shipped")
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        if (!orderId || !status) {
            return res.status(400).json({ success: false, message: "Missing orderId or status" });
        }
        await orderModel.findByIdAndUpdate(orderId, { status });
        res.json({ success: true, message: "Status Updated" })
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error updating status" })
    }
}

export { placeOrder, allOrders, updateStatus }