import { describe, it, expect, vi } from 'vitest';
import { escapeRegex, searchProducts } from './productController.js';

describe('Search Controller Security & ReDoS Mitigation', () => {
    it('escapeRegex: properly neutralizes all regular expression metacharacters', () => {
        const attackString = '.*+?^${}()|[]\\(a+)+$';
        const escaped = escapeRegex(attackString);

        expect(escaped).toBe('\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\\\(a\\+\\)\\+\\$');

        // Verify standard RegExp compilation creates a literal match without syntax or backtracking errors
        const regex = new RegExp(escaped);
        expect(regex.test('.*+?^${}()|[]\\(a+)+$')).toBe(true);
        expect(regex.test('regular text')).toBe(false);
    });

    it('searchProducts: rejects queries exceeding 100 characters with 400 Bad Request', async () => {
        const longQuery = 'a'.repeat(101);
        const req = { query: { q: longQuery } };
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

        await searchProducts(req, res);

        expect(res.statusCode).toBe(400);
        expect(res.jsonData.success).toBe(false);
        expect(res.jsonData.message).toMatch(/exceeds maximum length/i);
    });

    it('searchProducts: rejects non-string query parameter with 400 Bad Request', async () => {
        const req = { query: { q: { $regex: '.*' } } };
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

        await searchProducts(req, res);

        expect(res.statusCode).toBe(400);
        expect(res.jsonData.success).toBe(false);
        expect(res.jsonData.message).toMatch(/invalid search query parameter/i);
    });
});

