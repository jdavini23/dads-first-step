'use client'

import { ReactNode, useEffect, useRef, useCallback } from 'react'
import { 
  getAuth, 
  onAuthStateChanged, 
  User 
} from 'firebase/auth'
import { firebaseService } from '@/lib/firebaseApp'
import { useAuthStore } from '@/stores/authStore'

// Performance monitoring
const logPerformance = (name: string, startTime: number) => {
  const duration = performance.now() - startTime
  if (duration > 50) {
    console.warn(`Performance: ${name} took ${duration.toFixed(2)}ms`)
  }
}

const FirebaseProvider = ({ children }: { children: ReactNode }) => {
  const { setUser, reset, setError } = useAuthStore()
  
  // Use ref to track performance monitoring
  const authStateStartTime = useRef<number | null>(null)

  // Memoize user setting to prevent unnecessary re-renders
  const handleSetUser = useCallback((firebaseUser: User) => {
    try {
      const startTime = performance.now()
      
      // Validate user object
      if (!firebaseUser || !firebaseUser.uid) {
        console.warn('Attempted to set invalid user object', firebaseUser)
        return
      }

      // Extract additional user information
      firebaseUser.getIdTokenResult()
        .then((tokenResult) => {
          console.log('User token claims:', tokenResult.claims)
          console.log('Token expiration:', tokenResult.expirationTime)
        })
        .catch((error) => {
          console.warn('Failed to get token claims:', error)
        })

      // Set user with comprehensive details
      setUser({
        uid: firebaseUser.uid,
        email: firebaseUser.email || '',
        displayName: firebaseUser.displayName || 'Anonymous',
        photoURL: firebaseUser.photoURL || '',
      })

      logPerformance('setUser', startTime)
    } catch (err) {
      console.error('Error setting user:', err)
      setError(err instanceof Error ? err.message : 'Failed to set user')
    }
  }, [setUser, setError])

  useEffect(() => {
    // Extensive logging for Firebase initialization
    console.group('Firebase Authentication')
    console.log('Environment:', process.env.NODE_ENV)
    console.log('Firebase Config:', {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? '✓ Present' : '✗ Missing',
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? '✓ Present' : '✗ Missing',
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? '✓ Present' : '✗ Missing',
    })
    console.groupEnd()

    // Start performance tracking
    authStateStartTime.current = performance.now()

    try {
      // Use getAuth to ensure we're using the most current auth instance
      const auth = getAuth()

      // More robust auth state change listener
      const unsubscribe = onAuthStateChanged(
        auth,
        (user) => {
          // Log performance of auth state change
          if (authStateStartTime.current) {
            logPerformance('onAuthStateChanged', authStateStartTime.current)
            authStateStartTime.current = null
          }

          console.log('Auth state changed:', user ? 'User signed in' : 'No user')

          if (user) {
            // User is signed in
            handleSetUser(user)
          } else {
            // User is signed out
            reset()
          }
        },
        (error) => {
          console.error('Authentication state error:', error)
          setError(error.message || 'Authentication error occurred')
        },
        // Add a timeout to handle potential connection issues
        () => {
          console.warn('Auth state change listener timed out')
          setError('Authentication listener timed out')
        }
      )

      // Cleanup subscription on unmount
      return () => unsubscribe()
    } catch (error) {
      console.error('Fatal Firebase authentication setup error:', error)
      setError('Failed to set up authentication')
    }
  }, [handleSetUser, reset, setError])

  return <>{children}</>
}

export { FirebaseProvider }
