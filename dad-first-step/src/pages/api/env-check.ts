import { NextApiRequest, NextApiResponse } from 'next';

interface EnvCheckResponse {
  status: string;
  environment: {
    nodeEnv: string | undefined;
    nextPublicEnv: string | undefined;
  };
}

export default function handler(req: NextApiRequest, res: NextApiResponse<EnvCheckResponse>) {
  res.status(200).json({
    status: 'ok',
    environment: {
      nodeEnv: process.env.NODE_ENV,
      nextPublicEnv: process.env.NEXT_PUBLIC_ENV,
    },
  });
}
