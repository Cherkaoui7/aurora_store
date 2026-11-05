import express from 'express';
import jwt from 'jsonwebtoken';

const adminRouter = express.Router();

// Admin login — validates against env credentials
adminRouter.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
        return res.status(400).json({ success: false, message: 'Invalid credentials format' });
    }

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@aurora.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (email.trim() === adminEmail && password === adminPassword) {
        const token = jwt.sign({ id: 'admin', role: 'admin' }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });
        res.json({ success: true, token });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

export default adminRouter;
