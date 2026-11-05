import jwt from 'jsonwebtoken';

/**
 * Customer / General User Authentication Middleware
 * Validates any valid signed JWT (customer or admin).
 * Populates req.userId and req.userRole.
 */
const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || req.headers.token;
        if (!authHeader) {
            return res.status(401).json({ success: false, message: "Not Authorized. Please login." });
        }

        const tokenValue = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : authHeader.trim();
        const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);
        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error.message);
        return res.status(401).json({ success: false, message: "Invalid or expired token." });
    }
};

/**
 * Admin-Only Authorization Middleware
 * Enforces role === 'admin' or id === 'admin'.
 * Rejects unauthenticated with 401, non-admin customers with 403.
 */
const adminAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || req.headers.token;
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Not Authorized. Admin login required."
            });
        }

        const tokenValue = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : authHeader.trim();
        const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);

        if (decoded.role !== 'admin' && decoded.id !== 'admin') {
            return res.status(403).json({
                success: false,
                message: "Access Forbidden. Admin privileges required."
            });
        }

        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    } catch (error) {
        console.error("Admin Auth Middleware Error:", error.message);
        return res.status(401).json({
            success: false,
            message: "Invalid or expired admin token."
        });
    }
};

export { authMiddleware, adminAuth };
export default authMiddleware;
