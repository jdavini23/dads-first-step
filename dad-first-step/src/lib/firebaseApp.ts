import { 
  initializeApp, 
  getApps, 
  FirebaseApp, 
  getApp, 
  FirebaseOptions
} from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { 
  getFirestore, 
  enableIndexedDbPersistence
} from 'firebase/firestore'
import { toast } from 'sonner'

// Firebase configuration
const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

// Validate required Firebase configuration
const validateFirebaseConfig = () => {
  const requiredFields = [
    'apiKey',
    'authDomain',
    'projectId',
    'storageBucket',
    'messagingSenderId',
    'appId',
  ]

  const missingFields = requiredFields.filter(
    (field) => !firebaseConfig[field as keyof typeof firebaseConfig]
  )

  if (missingFields.length > 0) {
    throw new Error(
      `Missing required Firebase configuration fields: ${missingFields.join(', ')}`
    )
  }

  console.log('✅ Firebase configuration validated successfully')
}

// Initialize Firestore with settings
const initializeFirestoreWithSettings = (app: FirebaseApp) => {
  const db = getFirestore(app)
  
  // Enable offline persistence
  if (typeof window !== 'undefined') {
    enableIndexedDbPersistence(db).catch((err) => {
      if (err.code === 'failed-precondition') {
        console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.')
      } else if (err.code === 'unimplemented') {
        console.warn('The current browser does not support persistence.')
      }
    })
  }
  
  return db
}

class FirebaseService {
  private static instance: FirebaseService | null = null
  public app: FirebaseApp
  public auth: ReturnType<typeof getAuth>
  public db: ReturnType<typeof getFirestore>

  private constructor() {
    try {
      validateFirebaseConfig()

      // Initialize Firebase app if not already initialized
      if (!getApps().length) {
        this.app = initializeApp(firebaseConfig)
      } else {
        this.app = getApp()
      }

      // Initialize services
      this.auth = getAuth(this.app)
      this.db = initializeFirestoreWithSettings(this.app)

      // Set up auth state listener
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          console.log('User is signed in:', user.uid)
        } else {
          console.log('User is signed out')
        }
      })

      console.log('✅ Firebase services initialized successfully', {
        appName: this.app.name,
        projectId: firebaseConfig.projectId,
        authDomain: firebaseConfig.authDomain,
        environment: process.env.NODE_ENV,
      })
    } catch (error) {
      console.error('❌ Failed to initialize Firebase:', error)
      toast.error('Failed to initialize Firebase. Please check your configuration.')
      throw error
    }
  }

  public static getInstance(): FirebaseService {
    if (!FirebaseService.instance) {
      FirebaseService.instance = new FirebaseService()
    }
    return FirebaseService.instance
  }

  // Method to reset instance (use with caution)
  public static reset() {
    FirebaseService.instance = null
  }
}

// Export a singleton instance
export const firebaseService = FirebaseService.getInstance()
