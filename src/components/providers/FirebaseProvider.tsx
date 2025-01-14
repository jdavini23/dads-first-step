'use client'

import { ReactNode, useEffect, useRef } from 'react'
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

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMxw5NbYFfTQlaTpBj5CUePhyTYKnMokI",
  authDomain: "dads-first-step.firebaseapp.com",
  projectId: "dads-first-step",
  storageBucket: "dads-first-step.firebasestorage.app",
  messagingSenderId: "1052702875901",
  appId: "1:1052702875901:web:236a8dc28842b01810de94",
  measurementId: "G-3KBF5JKTBZ"
}

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig)
const auth: Auth = getAuth(app)
const db: Firestore = getFirestore(app)

// Connect to emulators in development
if (process.env.NODE_ENV === 'development') {
  connectAuthEmulator(auth, 'http://localhost:9099')
  connectFirestoreEmulator(db, 'localhost', 8080)
}

export const FirebaseProvider = ({ children }: { children: ReactNode }) => {
  const { setUser, reset, setError } = useAuthStore()
  
  // Use ref to track performance monitoring
  const authStateStartTime = useRef<number | null>(null)

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
  }, [setUser, reset, setError])

  return <>{children}</>
}

// Export Firebase instances for use in other components
export { app, auth, db }
