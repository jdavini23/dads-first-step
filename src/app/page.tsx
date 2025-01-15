'use client'

import { Suspense, lazy, useEffect } from 'react'
import { useAuthStore } from '@/stores/authStore'
import { ErrorBoundary } from 'react-error-boundary'
import { motion } from 'framer-motion'
import { SignInButton } from '@/components/auth/SignInButton'

// Components
const MilestoneTracker = lazy(() => 
  import('@/components/features/MilestoneTracker').then(module => ({
    default: module.MilestoneTracker
  }))
)

// Types
interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">
    <p className="font-bold">Something went wrong:</p>
    <p className="text-sm">{error.message}</p>
    <button
      onClick={resetErrorBoundary}
      className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
    >
      Try again
    </button>
  </div>
)

const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
)

export default function Home() {
  const { user } = useAuthStore()

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <main className="min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-4">
              Dad&apos;s First Step
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Your trusted companion in the beautiful journey of fatherhood
            </p>
          </motion.div>

          {user ? (
            <Suspense fallback={<LoadingSpinner />}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"
              >
                <MilestoneTracker />
              </motion.div>
            </Suspense>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-2xl mx-auto text-center bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Start Tracking Your Journey
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Sign in to access your personalized milestone tracker and begin documenting 
                your incredible journey into fatherhood.
              </p>
              <div className="flex justify-center">
                <SignInButton />
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </ErrorBoundary>
  )
}
