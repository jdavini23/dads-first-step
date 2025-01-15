import { useEffect } from 'react';

export default function DebugPage() {
  useEffect(() => {
    // Log all NEXT_PUBLIC environment variables
    const envVars = Object.keys(process.env)
      .filter((key) => key.startsWith('NEXT_PUBLIC_'))
      .reduce(
        (acc, key) => {
          acc[key] = process.env[key];
          return acc;
        },
        {} as Record<string, string | undefined>
      );

    console.group('🔍 Client-side Environment Variables');
    console.log('Environment Variables:', envVars);
    console.log('Total Variables:', Object.keys(envVars).length);
    console.log(
      'Firebase Variables:',
      Object.keys(envVars).filter((key) => key.startsWith('NEXT_PUBLIC_FIREBASE_'))
    );
    console.groupEnd();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Environment Debug Page</h1>
      <p className="mb-2">Check the browser console for environment variable details.</p>
      <p className="text-gray-600">
        Note: Only NEXT_PUBLIC_ variables are visible on the client side.
      </p>
    </div>
  );
}
