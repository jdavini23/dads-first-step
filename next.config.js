/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'lh3.googleusercontent.com', // Google profile pictures
      'firebasestorage.googleapis.com', // Firebase storage
    ],
  },
  reactStrictMode: true,
  
  // Server-side only config
  serverRuntimeConfig: {
    // Add server-only config here
  },

  // Client and server config
  publicRuntimeConfig: {
    firebase: {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
    }
  }
}

// Debug environment variables during build
console.log('Next.js Config - Environment Variables:', {
  API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY?.substring(0, 5) + '...',
  AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
})

module.exports = nextConfig
