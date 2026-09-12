/** @type {import('next').NextConfig} */
const nextConfig = {
  // Docker-friendly output: produces .next/standalone for a minimal, self-contained image
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
    ],
  },
};

const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();

module.exports = withNextIntl(nextConfig);