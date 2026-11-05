// Configuration validation for Aurora Backend environment variables

const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET'];

export function validateEnvVars() {
    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

    if (missingVars.length) {
        console.warn('⚠️ Missing recommended environment variables:', missingVars.join(', '));
        console.warn('⚠️ Ensure MONGODB_URI and JWT_SECRET are set in your .env file.');
    } else {
        console.log('✅ Required environment variables verified.');
    }

    if (!process.env.CLOUDINARY_CLOUD_NAME) {
        console.log('ℹ️ Cloudinary credentials not detected - falling back to memory/Base64 storage.');
    }

    if (!process.env.STRIPE_SECRET_KEY) {
        console.log('ℹ️ Stripe credentials not detected - Stripe Checkout will require STRIPE_SECRET_KEY in backend/.env.');
    }
}

export default validateEnvVars;
