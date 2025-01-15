import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Get all environment variables
  const envVars = process.env

  // Create a debug object focusing on Firebase variables
  const debugInfo = {
    environment: process.env.NODE_ENV,
    firebase: {
      apiKey: {
        value: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        exists: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        length: process.env.NEXT_PUBLIC_FIREBASE_API_KEY?.length || 0
      },
      authDomain: {
        value: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        exists: !!process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        length: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN?.length || 0
      },
      projectId: {
        value: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        exists: !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        length: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID?.length || 0
      }
    },
    nextRuntime: process.env.NEXT_RUNTIME,
    hasWindow: typeof window !== 'undefined'
  }

  // Return debug information
  res.status(200).json({
    success: true,
    debug: debugInfo
  })
}
