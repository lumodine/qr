require('dotenv')
    .config();

const requiredEnvs = [
    'NODE_ENV',
    'PORT',
    'LANDING_URL',
    'API_URL',
    'QR_MENU_URL',
];

const requiredEnvErrors = [];
for (const requiredEnv of requiredEnvs) {
    const env = process.env[requiredEnv];

    if (!env) {
        requiredEnvErrors.push(`'${requiredEnv}' env is required.`);
    }
}

if (requiredEnvErrors.length > 0) {
    throw Error(requiredEnvErrors.join('\n'));
}

require('./server');
