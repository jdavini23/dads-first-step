import { NextApiRequest, NextApiResponse } from 'next';

interface EnvironmentVars {
  environment: string;
  firebaseVars: Record<string, string | undefined>;
  allPublicVars: Record<string, string | undefined>;
  rawEnvContent: Record<string, string | undefined>;
}

interface EnvDebugResponse {
  success: boolean;
  debug: EnvironmentVars;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<EnvDebugResponse>) {
  const debug: EnvironmentVars = {
    environment: process.env.NODE_ENV || 'development',
    firebaseVars: {
      NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    },
    allPublicVars: Object.entries(process.env)
      .filter(([key]) => key.startsWith('NEXT_PUBLIC_'))
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}),
    rawEnvContent: process.env,
  };

  res.status(200).json({
    success: true,
    debug,
  });
}
