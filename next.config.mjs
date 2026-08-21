/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: [
    '*.trycloudflare.com',
    'craps-oval-arbitrary-photographer.trycloudflare.com',
  ],
};

export default nextConfig
