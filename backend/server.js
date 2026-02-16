import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import productRouter from './routes/productRoute.js';
import orderRouter from './routes/orderRoute.js';
import path from 'path';
import { fileURLToPath } from 'url';

// App Config
const app = express();
const port = process.env.PORT || 4000;

// ES module __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
let isConnected = false;
const connectDB = async () => {
    if (isConnected) return;
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        isConnected = true;
        console.log("✅ MongoDB Connected Successfully");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
    }
}

// API Endpoints
app.use('/api/product', productRouter);
app.use('/api/order', orderRouter);

// Serve uploaded images (local dev only)
app.use('/images', express.static(path.join(__dirname, 'uploads')));

app.get('/api', (req, res) => {
    res.send("API is Working");
});

// Only listen when run directly (not when imported by Vercel)
const isDirectRun = process.argv[1] && (
    process.argv[1].endsWith('server.js') ||
    process.argv[1].includes('nodemon')
);

if (isDirectRun) {
    connectDB().then(() => {
        app.listen(port, () => {
            console.log(`🚀 Server started on http://localhost:${port}`);
        });
    });
}

export { app, connectDB };