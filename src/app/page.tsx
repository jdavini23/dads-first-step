'use client'

import { Suspense, lazy, useEffect, useState } from 'react'
import Image from "next/image";
import { useAuthStore } from '@/stores/authStore'

// Lazy load the MilestoneTracker
const MilestoneTracker = lazy(() => 
  import('@/components/features/MilestoneTracker').then(module => ({
    default: module.MilestoneTracker
  }))
)

// Performance monitoring function
const logPerformance = (name: string, startTime: number) => {
  const duration = performance.now() - startTime
  if (duration > 50) {
    console.warn(`Performance: ${name} took ${duration.toFixed(2)}ms`)
  }
}

export default function Home() {
  const { user, error } = useAuthStore()
  const [renderStartTime, setRenderStartTime] = useState<number | null>(null)

  useEffect(() => {
    // Start performance tracking
    setRenderStartTime(performance.now())

    // Log performance when component is fully rendered
    return () => {
      if (renderStartTime) {
        logPerformance('Home component render', renderStartTime)
      }
    }
  }, [])

  useEffect(() => {
    if (error) {
      // Optional: You could add a toast or notification system here
      console.error('Authentication Error:', error)
    }
  }, [error])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {user ? (
          <Suspense fallback={
            <div className="text-center text-xl">
              Loading Milestone Tracker...
            </div>
          }>
            <div>
              <h1 className="text-4xl font-bold text-center mb-8">
                Welcome to Dad&apos;s First Step
              </h1>
              <p className="text-center text-xl mb-4">
                Your companion in the journey of fatherhood
              </p>
              
              <MilestoneTracker />
            </div>
          </Suspense>
        ) : (
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Welcome to Dad&apos;s First Step</h1>
            <p className="mb-6">Please sign in to access your milestone tracker</p>
          </div>
        )}
      </div>
    </main>
  )
}
