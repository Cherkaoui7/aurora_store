import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ success: false, message: "Not Authorized. Please login." });
        }

        const tokenValue = token.startsWith('Bearer ') ? token.slice(7) : token;
        const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ success: false, message: "Invalid or expired token." });
    }
};

export default authMiddleware;
