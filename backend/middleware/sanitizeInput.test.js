import { describe, it, expect } from 'vitest';
import { sanitizeValue, sanitizeInput } from './sanitizeInput.js';

describe('NoSQL Injection Sanitization Middleware', () => {
    it('sanitizeValue: recursively removes keys starting with $ or containing dots', () => {
        const maliciousPayload = {
            username: 'normal_user',
            password: { $ne: null },
            nested: {
                'profile.role': 'admin',
                validKey: 'safe_value',
                $where: 'sleep(5000)'
            },
            arr: [
                { $gt: '' },
                { safe: 123 }
            ]
        };

        const sanitized = sanitizeValue(maliciousPayload);

        expect(sanitized.username).toBe('normal_user');
        expect(sanitized.password).toEqual({});
        expect(sanitized.nested['profile.role']).toBeUndefined();
        expect(sanitized.nested.$where).toBeUndefined();
        expect(sanitized.nested.validKey).toBe('safe_value');
        expect(sanitized.arr[0]).toEqual({});
        expect(sanitized.arr[1]).toEqual({ safe: 123 });
    });

    it('sanitizeInput middleware: cleans req.body, req.query, and req.params', () => {
        const req = {
            body: { email: 'admin@aurora.com', $gt: '' },
            query: { search: 'jacket', 'category.$regex': '.*' },
            params: { id: '507f1f77bcf86cd799439011' }
        };
        const res = {};
        let nextCalled = false;
        const next = () => { nextCalled = true; };

        sanitizeInput(req, res, next);

        expect(nextCalled).toBe(true);
        expect(req.body.$gt).toBeUndefined();
        expect(req.body.email).toBe('admin@aurora.com');
        expect(req.query['category.$regex']).toBeUndefined();
        expect(req.query.search).toBe('jacket');
    });
});

