import orderModel from "../models/orderModel.js";

// 1. Placing an Order (Cash on Delivery method for now)
const placeOrder = async (req, res) => {
    try {
        // We get all this data from the Frontend form
        const { userId, items, amount, address, paymentMethod } = req.body;

        const newOrder = new orderModel({
            userId,
            items,
            amount,
            address,
            paymentMethod,
            payment: false, // Not paid yet if COD
            date: Date.now()
        })

        await newOrder.save();

        // (Optional) Clear user cart logic would go here

        res.json({ success: true, message: "Order Placed Successfully" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error placing order" })
    }
}

// 2. All Orders (For Admin Panel)
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching orders" })
    }
}

// 3. Update Status (For Admin to change "Order Placed" -> "Shipped")
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "Status Updated" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error updating status" })
    }
}

export { placeOrder, allOrders, updateStatus }