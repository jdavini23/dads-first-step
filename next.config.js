/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    typedRoutes: true,
    optimizePackageImports: ['@mui/material', '@mui/icons-material'],
    serverComponentsExternalPackages: ['@prisma/client']
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    domains: ['firebasestorage.googleapis.com', 'lh3.googleusercontent.com'],
    formats: ['image/avif', 'image/webp']
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false
      };
    }
    return config;
  }
};

export default nextConfig;
