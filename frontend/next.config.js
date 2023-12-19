/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const nextTranslate = require('next-translate-plugin');
const nextConfig = {
  // Drag and Drop will not work if reactStrictMode is true
  reactStrictMode: false,
  trailingSlash: true,
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  swcMinify: true,
};

module.exports = nextTranslate(nextConfig);
