/** @type {import('next').NextConfig} */
export default {
  experimental: {
    typedRoutes: true,
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    domains: ['firebasestorage.googleapis.com', 'lh3.googleusercontent.com']
  }
};
