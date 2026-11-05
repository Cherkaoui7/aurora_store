/**
 * Security Headers Middleware
 * Applies defense-in-depth HTTP security headers to protect against
 * MIME-sniffing, clickjacking, cross-site scripting (XSS), and referer leakage.
 */
const securityHeaders = (req, res, next) => {
    // Prevent MIME type sniffing
    res.setHeader('X-Content-Type-Options', 'nosniff');

    // Prevent clickjacking by framing
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');

    // Legacy XSS filter for older browsers
    res.setHeader('X-XSS-Protection', '1; mode=block');

    // Restrict referrer leakage
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

    // Disable caching of sensitive API responses
    if (req.path.startsWith('/api/order') || req.path.startsWith('/api/user')) {
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
    }

    next();
};

export default securityHeaders;

