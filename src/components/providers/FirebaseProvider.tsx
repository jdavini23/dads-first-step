'use client'

import { ReactNode } from 'react'
import { FirebaseApp, initializeApp } from 'firebase/app'
import { Auth, getAuth, onAuthStateChanged } from 'firebase/auth'
import { Firestore, getFirestore } from 'firebase/firestore'
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

export const FirebaseProvider = ({ children }: { children: ReactNode }) => {
  const { setUser, reset } = useAuthStore()

  // Listen for authentication state changes
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      setUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      })
    } else {
      // User is signed out
      reset()
    }
  })

  return <>{children}</>
}

// Export Firebase instances for use in other components
export { app, auth, db }
