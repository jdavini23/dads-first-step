'use client'

import { ReactNode, useEffect, useRef, useCallback } from 'react'
import { auth } from '@/lib/firebase'
import { useAuthStore } from '@/stores/authStore'

// Performance monitoring
const logPerformance = (name: string, startTime: number) => {
  const duration = performance.now() - startTime
  if (duration > 50) {
    console.warn(`Performance: ${name} took ${duration.toFixed(2)}ms`)
  }
}

export const FirebaseProvider = ({ children }: { children: ReactNode }) => {
  const { setUser, reset, setError } = useAuthStore()
  
  // Use ref to track performance monitoring
  const authStateStartTime = useRef<number | null>(null)

  // Memoize user setting to prevent unnecessary re-renders
  const handleSetUser = useCallback((user: any) => {
    try {
      const startTime = performance.now()
      setUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      })
      logPerformance('setUser', startTime)
    } catch (err) {
      console.error('Error setting user:', err)
      setError(err instanceof Error ? err.message : 'Failed to set user')
    }
  }, [setUser, setError])

  useEffect(() => {
    // Start performance tracking
    authStateStartTime.current = performance.now()

    const unsubscribe = auth.onAuthStateChanged(
      (user) => {
        // Log performance of auth state change
        if (authStateStartTime.current) {
          logPerformance('onAuthStateChanged', authStateStartTime.current)
          authStateStartTime.current = null
        }

        if (user) {
          // User is signed in
          handleSetUser(user)
        } else {
          // User is signed out
          reset()
        }
      },
      (error) => {
        console.error('Authentication error:', error)
        setError(error.message)
      }
    )

    // Cleanup subscription on unmount
    return () => unsubscribe()
  }, [handleSetUser, reset, setError])

  return <>{children}</>
}

// Export Firebase instances for use in other components
export { auth }
