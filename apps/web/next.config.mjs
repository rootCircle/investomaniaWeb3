/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        PINATA_BASE_URL: process.env.PINATA_BASE_URL,
        PINATA_JWT_TOKEN: process.env.PINATA_JWT_TOKEN
    }
};

export default nextConfig;
