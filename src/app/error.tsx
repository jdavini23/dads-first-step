'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Unhandled error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-8 text-center">
        <h2 className="text-3xl font-bold text-red-600 mb-4">Something Went Wrong</h2>
        <p className="text-gray-700 mb-6">
          We encountered an unexpected error. Don't worry, we're on it!
        </p>

        <div className="flex flex-col space-y-4">
          <Button variant="default" onClick={() => reset()} className="w-full">
            Try Again
          </Button>

          <Button variant="outline" onClick={() => router.push('/')} className="w-full">
            Go to Home
          </Button>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <div className="mt-6 text-left bg-gray-100 p-4 rounded-md">
            <h3 className="font-semibold text-sm mb-2">Error Details:</h3>
            <pre className="text-xs text-gray-700 overflow-x-auto">{error.message}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
