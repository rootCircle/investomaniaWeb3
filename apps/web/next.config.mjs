/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        PINNATA_BASE_URL: process.env.PINNATA_BASE_URL,
        PINNATA_JWT_TOKEN: process.env.PINNATA_JWT_TOKEN
    }
};

export default nextConfig;
