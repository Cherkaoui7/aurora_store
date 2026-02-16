// Configuration validation for environment variables

const requiredEnvVars = ['DB_HOST', 'DB_USER', 'DB_PASS', 'API_KEY'];

function validateEnvVars() {
    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

    if (missingVars.length) {
        console.error('Missing required environment variables:', missingVars.join(', '));
        process.exit(1);
    }
    console.log('All required environment variables are set.');
}

validateEnvVars();