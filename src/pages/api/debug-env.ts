import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Get all environment variables
  const envVars = Object.keys(process.env)
    .filter(key => key.startsWith('NEXT_PUBLIC_'))
    .reduce((acc, key) => {
      acc[key] = process.env[key]
      return acc
    }, {} as Record<string, string | undefined>)

  // Return environment variables
  res.status(200).json({
    nodeEnv: process.env.NODE_ENV,
    envVars,
    totalEnvVars: Object.keys(envVars).length,
    firebaseVars: Object.keys(envVars).filter(key => key.startsWith('NEXT_PUBLIC_FIREBASE_'))
  })
}
