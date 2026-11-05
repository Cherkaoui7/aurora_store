import { describe, it, expect, vi, beforeEach } from 'vitest';
import jwt from 'jsonwebtoken';
import { authMiddleware, adminAuth } from './auth.js';

describe('Auth & Admin Role Middleware Verification', () => {
    const JWT_SECRET = 'test_secret_key_12345';
    beforeEach(() => {
        process.env.JWT_SECRET = JWT_SECRET;
    });

    const createMockReqRes = (headers = {}) => {
        const req = {
            headers,
        };
        const res = {
            statusCode: 200,
            jsonData: null,
            status(code) {
                this.statusCode = code;
                return this;
            },
            json(data) {
                this.jsonData = data;
                return this;
            }
        };
        const next = vi.fn();
        return { req, res, next };
    };

    it('authMiddleware: rejects request when token is missing', async () => {
        const { req, res, next } = createMockReqRes({});
        await authMiddleware(req, res, next);

        expect(res.statusCode).toBe(401);
        expect(res.jsonData.success).toBe(false);
        expect(res.jsonData.message).toMatch(/not authorized/i);
        expect(next).not.toHaveBeenCalled();
    });

    it('authMiddleware: permits authenticated customer with valid customer JWT', async () => {
        const customerToken = jwt.sign({ id: 'cust_123', role: 'customer' }, JWT_SECRET);
        const { req, res, next } = createMockReqRes({ authorization: `Bearer ${customerToken}` });

        await authMiddleware(req, res, next);

        expect(next).toHaveBeenCalled();
        expect(req.userId).toBe('cust_123');
        expect(req.userRole).toBe('customer');
    });

    it('adminAuth: rejects unauthenticated request when token is missing', async () => {
        const { req, res, next } = createMockReqRes({});
        await adminAuth(req, res, next);

        expect(res.statusCode).toBe(401);
        expect(res.jsonData.success).toBe(false);
        expect(res.jsonData.message).toMatch(/admin login required/i);
        expect(next).not.toHaveBeenCalled();
    });

    it('adminAuth [CRITICAL SEC-1]: rejects customer token with 403 Forbidden', async () => {
        const customerToken = jwt.sign({ id: 'cust_attacker_99', role: 'customer' }, JWT_SECRET);
        const { req, res, next } = createMockReqRes({ authorization: `Bearer ${customerToken}` });

        await adminAuth(req, res, next);

        expect(res.statusCode).toBe(403);
        expect(res.jsonData.success).toBe(false);
        expect(res.jsonData.message).toMatch(/admin privileges required/i);
        expect(next).not.toHaveBeenCalled();
    });

    it('adminAuth: permits authorized admin token with role "admin"', async () => {
        const adminToken = jwt.sign({ id: 'admin', role: 'admin' }, JWT_SECRET);
        const { req, res, next } = createMockReqRes({ authorization: `Bearer ${adminToken}` });

        await adminAuth(req, res, next);

        expect(next).toHaveBeenCalled();
        expect(req.userId).toBe('admin');
        expect(req.userRole).toBe('admin');
    });

    it('adminAuth: also accepts raw "token" header format used by legacy admin clients', async () => {
        const adminToken = jwt.sign({ id: 'admin', role: 'admin' }, JWT_SECRET);
        const { req, res, next } = createMockReqRes({ token: adminToken });

        await adminAuth(req, res, next);

        expect(next).toHaveBeenCalled();
        expect(req.userId).toBe('admin');
    });
});

