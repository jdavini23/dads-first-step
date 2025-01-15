import React from 'react';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

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
    
  }, [error]);

  const handleRetry = () => {
    // First try to reset the error boundary
    try {
      reset();
    } catch {
      // If reset fails, try to reload the page
      window.location.reload();
    }
  };

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h1>
          <p className="text-lg text-gray-600 mb-8">
            {error.message || 'An unexpected error occurred'}
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleRetry}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Try again
          </button>

          <button
            onClick={handleGoHome}
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Go back home
          </button>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 text-left">
            <details className="bg-gray-100 p-4 rounded-lg">
              <summary className="text-sm font-medium text-gray-900 cursor-pointer">
                Error details
              </summary>
              <pre className="mt-2 text-xs text-gray-600 overflow-auto">{error.stack}</pre>
            </details>
          </div>
        )}
      </div>
    </div>
  );
}
