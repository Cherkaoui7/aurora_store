import { app, connectDB } from '../backend/server.js';

// Vercel Serverless Handler
export default async function handler(req, res) {
    await connectDB();
    return app(req, res);
}
