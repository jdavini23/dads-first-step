'use client'

import { ReactNode, useEffect, useRef, useCallback } from 'react'
import { FirebaseApp, initializeApp } from 'firebase/app'
import { Auth, getAuth, onAuthStateChanged, connectAuthEmulator } from 'firebase/auth'
import { Firestore, getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { useAuthStore } from '@/stores/authStore'

// Performance monitoring
const logPerformance = (name: string, startTime: number) => {
  const duration = performance.now() - startTime
  if (duration > 50) {
    console.warn(`Performance: ${name} took ${duration.toFixed(2)}ms`)
  }
}

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
}

// Validate configuration
if (!firebaseConfig.apiKey) {
  console.error('Firebase configuration is missing. Check your environment variables.')
}

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig)
const auth: Auth = getAuth(app)
const db: Firestore = getFirestore(app)

// Determine if we should use emulators
const shouldUseEmulators = () => {
  // Only use emulators in local development
  return process.env.NODE_ENV === 'development' && 
         typeof window !== 'undefined' && 
         window.location.hostname === 'localhost'
}

// Connect to emulators if appropriate
if (shouldUseEmulators()) {
  try {
    console.warn('🚨 Using Firebase Emulators - LOCAL DEVELOPMENT ONLY')
    connectAuthEmulator(auth, 'http://localhost:9099')
    connectFirestoreEmulator(db, 'localhost', 8080)
  } catch (error) {
    console.error('Failed to connect to Firebase emulators:', error)
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

    const unsubscribe = onAuthStateChanged(
      auth, 
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
export { app, auth, db }
