'use client'

import { ReactNode, useEffect } from 'react'
import { FirebaseApp, initializeApp } from 'firebase/app'
import { Auth, getAuth, onAuthStateChanged, connectAuthEmulator } from 'firebase/auth'
import { Firestore, getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { useAuthStore } from '@/stores/authStore'

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth, 
      (user) => {
        if (user) {
          // User is signed in
          try {
            setUser({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
            })
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
