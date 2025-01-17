import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Performance and optimization
  experimental: {
    optimizePackageImports: ['@/components', '@/hooks', '@/lib'],
    serverActions: {
      allowedOrigins: ['localhost:3000']
    },
    typedRoutes: true
  },

  // Webpack configuration
  webpack: (config, { isServer }) => {
    // Add support for absolute imports
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');

    // Ignore unnecessary files on the client
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false
      };
    }

    return config;
  },

  // Environment variable handling
  env: {
    NEXT_PUBLIC_APP_VERSION: process.env.npm_package_version
  },

  // Image optimization
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/avif', 'image/webp'],
    domains: ['firebasestorage.googleapis.com']
  },

  // Internationalization
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en'
  },

  // Custom page extensions
  pageExtensions: ['page.tsx', 'page.ts', 'api.ts', 'api.tsx'],
  eslint: {
    ignoreDuringBuilds: true
  }
};

export default nextConfig;
