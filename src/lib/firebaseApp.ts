import { initializeApp, getApps, FirebaseApp, getApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Enhanced Firebase configuration validation
const validateFirebaseConfig = (config: Record<string, string | undefined>) => {
  const requiredKeys = [
    'apiKey', 
    'authDomain', 
    'projectId', 
    'storageBucket', 
    'messagingSenderId', 
    'appId'
  ]

  const missingKeys = requiredKeys.filter(key => !config[key])
  
  if (missingKeys.length > 0) {
    const errorMessage = `Firebase configuration is incomplete. Missing keys: ${missingKeys.join(', ')}`
    console.error('❌ ' + errorMessage)
    
    // Provide more context about environment variables
    console.group('Firebase Environment Variables')
    requiredKeys.forEach(key => {
      console.log(`${key}: ${config[key] ? '✓ Present' : '✗ Missing'}`)
    })
    console.groupEnd()

    throw new Error(errorMessage)
  }

  // Additional validation for key formats
  if (config.apiKey && !config.apiKey.startsWith('AIza')) {
    console.warn('⚠️ API Key format seems unusual. Please double-check your configuration.')
  }

  if (config.authDomain && !config.authDomain.includes('.firebaseapp.com')) {
    console.warn('⚠️ Auth Domain format seems unusual. Please verify your Firebase project settings.')
  }
}

// Dynamically adjust Firebase configuration based on environment
const getFirebaseConfig = () => {
  const baseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
  }

  return baseConfig
}

const firebaseConfig = getFirebaseConfig()

class FirebaseService {
  private static instance: FirebaseService
  public app: FirebaseApp
  public auth: ReturnType<typeof getAuth>
  public db: ReturnType<typeof getFirestore>

  private constructor() {
    try {
      // Validate configuration before initialization
      validateFirebaseConfig(firebaseConfig)

      // Log detailed configuration information
      console.group('Firebase Initialization')
      console.log('Environment:', process.env.NODE_ENV)
      console.log('Configuration:', {
        projectId: firebaseConfig.projectId,
        authDomain: firebaseConfig.authDomain,
        apiKeyPresent: !!firebaseConfig.apiKey
      })
      console.groupEnd()

      // Initialize Firebase only if no app exists
      this.app = getApps().length === 0 
        ? initializeApp(firebaseConfig) 
        : getApp()
      
      // Initialize services with error handling
      try {
        this.auth = getAuth(this.app)
        this.db = getFirestore(this.app)
      } catch (serviceInitError) {
        console.error('❌ Failed to initialize Firebase services:', serviceInitError)
        throw serviceInitError
      }

      // Log successful initialization
      console.log('🔥 Firebase initialized successfully')
    } catch (error) {
      console.error('❌ Fatal Firebase initialization error:', error)
      
      // Provide actionable guidance
      console.group('Troubleshooting Firebase Configuration')
      console.log('1. Verify all NEXT_PUBLIC_FIREBASE_* environment variables are set')
      console.log('2. Check Firebase project settings in Firebase Console')
      console.log('3. Ensure you are using the correct configuration for your environment')
      console.groupEnd()

      throw error
    }
  }

  public static getInstance(): FirebaseService {
    if (!FirebaseService.instance) {
      FirebaseService.instance = new FirebaseService()
    }
    return FirebaseService.instance
  }
}

// Export a singleton instance
export const firebaseService = FirebaseService.getInstance()
