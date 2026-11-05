import { describe, it, expect, vi } from 'vitest';
import { removeProduct } from './productController.js';
import { updateStatus, verifyStripePayment } from './orderController.js';

describe('Backend Controller ObjectId Validation & CastError Prevention', () => {
    const createMockReqRes = (body = {}) => {
        const req = { body };
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
        return { req, res };
    };

    it('removeProduct: rejects missing product id with 400', async () => {
        const { req, res } = createMockReqRes({});
        await removeProduct(req, res);

        expect(res.statusCode).toBe(400);
        expect(res.jsonData.success).toBe(false);
        expect(res.jsonData.message).toMatch(/missing product id/i);
    });

    it('removeProduct: rejects invalid ObjectId format with 400 instead of throwing CastError 500', async () => {
        const { req, res } = createMockReqRes({ id: 'invalid-non-hex-id-xyz' });
        await removeProduct(req, res);

        expect(res.statusCode).toBe(400);
        expect(res.jsonData.success).toBe(false);
        expect(res.jsonData.message).toMatch(/invalid product id format/i);
    });

    it('updateStatus: rejects missing orderId or status with 400', async () => {
        const { req, res } = createMockReqRes({ orderId: '507f1f77bcf86cd799439011' });
        await updateStatus(req, res);

        expect(res.statusCode).toBe(400);
        expect(res.jsonData.success).toBe(false);
        expect(res.jsonData.message).toMatch(/missing orderId or status/i);
    });

    it('updateStatus: rejects malformed orderId with 400 Bad Request', async () => {
        const { req, res } = createMockReqRes({ orderId: 'bad_order_id_123', status: 'Shipped' });
        await updateStatus(req, res);

        expect(res.statusCode).toBe(400);
        expect(res.jsonData.success).toBe(false);
        expect(res.jsonData.message).toMatch(/invalid order id format/i);
    });

    it('verifyStripePayment: rejects missing orderId with 400', async () => {
        const { req, res } = createMockReqRes({ success: true });
        await verifyStripePayment(req, res);

        expect(res.statusCode).toBe(400);
        expect(res.jsonData.success).toBe(false);
        expect(res.jsonData.message).toMatch(/missing orderId/i);
    });

    it('verifyStripePayment: rejects malformed orderId with 400 Bad Request', async () => {
        const { req, res } = createMockReqRes({ orderId: '12345-not-hex', success: true });
        await verifyStripePayment(req, res);

        expect(res.statusCode).toBe(400);
        expect(res.jsonData.success).toBe(false);
        expect(res.jsonData.message).toMatch(/invalid order id format/i);
    });
});

