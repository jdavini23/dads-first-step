'use client'

import Image from "next/image";
import { MilestoneTracker } from '@/components/features/MilestoneTracker'
import { useAuthStore } from '@/stores/authStore'
import { useEffect } from 'react'

export default function Home() {
  const { user, error } = useAuthStore()

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
          <div>
            <h1 className="text-4xl font-bold text-center mb-8">
              Welcome to Dad&apos;s First Step
            </h1>
            <p className="text-center text-xl mb-4">
              Your companion in the journey of fatherhood
            </p>
            
            <MilestoneTracker />
          </div>
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
