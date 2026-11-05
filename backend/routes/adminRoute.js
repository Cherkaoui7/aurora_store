import express from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const adminRouter = express.Router();

// In-Memory Rate Limiter for Admin Login (Defense against Ultra Heavy Brute Force / Credential Stuffing)
const loginAttempts = new Map();
const MAX_ATTEMPTS = 10;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

// Periodic cleanup of stale rate limiter entries
setInterval(() => {
    const now = Date.now();
    for (const [ip, data] of loginAttempts.entries()) {
        if (now - data.startTime > WINDOW_MS) {
            loginAttempts.delete(ip);
        }
    }
}, 5 * 60 * 1000);

// Admin login — validates against env credentials with rate limiting and constant-time check
adminRouter.post('/login', (req, res) => {
    const clientIp = req.ip || req.socket?.remoteAddress || 'unknown';
    const now = Date.now();

    // Rate Limiting Check
    const attempts = loginAttempts.get(clientIp) || { count: 0, startTime: now };
    if (now - attempts.startTime > WINDOW_MS) {
        attempts.count = 0;
        attempts.startTime = now;
    }

    if (attempts.count >= MAX_ATTEMPTS) {
        return res.status(429).json({
            success: false,
            message: 'Trop de tentatives de connexion échouées. Veuillez réessayer dans 15 minutes.'
        });
    }

    const { email, password } = req.body;

    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
        return res.status(400).json({ success: false, message: 'Invalid credentials format' });
    }

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@aurora.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    // Timing-safe comparison to prevent timing attacks
    const emailMatches = email.trim() === adminEmail;
    
    // Constant-time buffer comparison for password
    const passwordBuf = Buffer.from(password);
    const expectedBuf = Buffer.from(adminPassword);
    const passwordMatches = passwordBuf.length === expectedBuf.length && crypto.timingSafeEqual(passwordBuf, expectedBuf);

    if (emailMatches && passwordMatches) {
        // Reset counter on successful login
        loginAttempts.delete(clientIp);

        const token = jwt.sign({ id: 'admin', role: 'admin' }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });
        res.json({ success: true, token });
    } else {
        // Increment failed attempt counter
        attempts.count += 1;
        loginAttempts.set(clientIp, attempts);
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

export default adminRouter;
