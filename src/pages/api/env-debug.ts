import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Get all environment variables
  const envVars = process.env

  // Create a debug object
  const debugInfo = {
    environment: process.env.NODE_ENV,
    firebaseVars: {} as Record<string, any>,
    allPublicVars: {} as Record<string, any>,
    rawEnvContent: {} as Record<string, any>
  }

  // Collect Firebase-specific variables
  Object.keys(envVars).forEach(key => {
    if (key.startsWith('NEXT_PUBLIC_FIREBASE_')) {
      debugInfo.firebaseVars[key] = {
        value: envVars[key],
        length: envVars[key]?.length || 0,
        type: typeof envVars[key],
        // Convert to array of character codes to check for hidden chars
        charCodes: Array.from(envVars[key] || '').map(c => c.charCodeAt(0))
      }
    }
  })

  // Collect all public variables
  Object.keys(envVars).forEach(key => {
    if (key.startsWith('NEXT_PUBLIC_')) {
      debugInfo.allPublicVars[key] = envVars[key]
    }
  })

  // Return debug information
  res.status(200).json({
    success: true,
    debug: debugInfo
  })
}
