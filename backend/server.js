import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import productRouter from './routes/productRoute.js';
import orderRouter from './routes/orderRoute.js';

// App Config
const app = express();
const port = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(cors({
    origin: [
        'http://localhost:3000',   // Frontend dev
        'http://localhost:5173',   // Admin dev (Vite)
        process.env.FRONTEND_URL, // Production frontend
        process.env.ADMIN_URL     // Production admin
    ].filter(Boolean),
    credentials: true
}));

// Database Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ MongoDB Connected Successfully");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
    }
}

// API Endpoints
app.use('/api/product', productRouter);
app.use('/api/order', orderRouter);

// Serve the uploaded images to the frontend
app.use('/images', express.static('uploads'));

app.get('/', (req, res) => {
    res.send("API is Working");
});

// Start Server
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`🚀 Server started on http://localhost:${port}`);
    });
});