import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'

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
const app = initializeApp(firebaseConfig)

// Initialize services
const auth = getAuth(app)
const db = getFirestore(app)
const googleProvider = new GoogleAuthProvider()

// Configure provider
googleProvider.setCustomParameters({
  prompt: 'select_account'
})

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

export { app, auth, db, googleProvider }
