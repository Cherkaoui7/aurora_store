/**
 * NoSQL Injection Sanitization Middleware
 * Recursively strips keys starting with '$' or containing '.' from req.body, req.query, and req.params
 * to prevent MongoDB query selector injection (e.g. { $gt: "" }, { $ne: null }).
 */
const sanitizeValue = (value) => {
    if (!value || typeof value !== 'object') {
        return value;
    }

    if (Array.isArray(value)) {
        return value.map(sanitizeValue);
    }

    const sanitized = {};
    for (const [key, val] of Object.entries(value)) {
        // Strip dangerous operators starting with '$' or MongoDB dot-notation keys
        if (!key.startsWith('$') && !key.includes('.')) {
            sanitized[key] = sanitizeValue(val);
        }
    }
    return sanitized;
};

const sanitizeInput = (req, res, next) => {
    try {
        if (req.body && typeof req.body === 'object') {
            req.body = sanitizeValue(req.body);
        }
        if (req.query && typeof req.query === 'object') {
            req.query = sanitizeValue(req.query);
        }
        if (req.params && typeof req.params === 'object') {
            req.params = sanitizeValue(req.params);
        }
        next();
    } catch (error) {
        console.error("Sanitize Input Middleware Error:", error);
        res.status(400).json({ success: false, message: "Malformed request payload" });
    }
};

export { sanitizeValue, sanitizeInput };
export default sanitizeInput;

