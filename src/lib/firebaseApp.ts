import { initializeApp, getApps, FirebaseApp, getApp, FirebaseOptions } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, initializeFirestore, CACHE_SIZE_UNLIMITED, connectFirestoreEmulator } from 'firebase/firestore';
import { toast } from 'sonner';

// Validate Firebase configuration
const validateFirebaseConfig = (config: FirebaseOptions) => {
  const requiredFields: (keyof FirebaseOptions)[] = [
    'apiKey',
    'authDomain',
    'projectId',
    'storageBucket',
    'messagingSenderId',
    'appId',
  ];

  const missingFields = requiredFields.filter(
    (field) => !config[field]
  );

  if (missingFields.length > 0) {
    const errorMessage = `Missing required Firebase configuration fields: ${missingFields.join(', ')}`;
    
    throw new Error(errorMessage);
  }

  // Additional validation for API key format
  if (config.apiKey && !/^[A-Za-z0-9_-]{39}$/.test(config.apiKey as string)) {
    
    throw new Error('Invalid Firebase API Key');
  }

  
};

// Firebase configuration
const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firestore with settings
const initializeFirestoreWithSettings = (app: FirebaseApp) => {
  try {
    // Check if Firestore is already initialized
    const existingDb = getFirestore(app);
    if (existingDb) return existingDb;

    const db = initializeFirestore(app, {
      cacheSizeBytes: CACHE_SIZE_UNLIMITED,
      experimentalForceLongPolling: true, // Force long polling for better network stability
    });

    // Optional: Connect to Firestore emulator in development
    if (process.env.NODE_ENV === 'development') {
      connectFirestoreEmulator(db, 'localhost', 8080);
    }

    
    return db;
  } catch (err) {
    toast.error('Failed to initialize Firestore. Please check your network connection.');
    throw err;
  }
};

class FirebaseService {
  private static instance: FirebaseService | null = null;
  public app: FirebaseApp;
  public auth: ReturnType<typeof getAuth>;
  public db: ReturnType<typeof getFirestore>;

  private constructor() {
    try {
      // Validate configuration before initialization
      validateFirebaseConfig(firebaseConfig);

      // Initialize Firebase app if not already initialized
      this.app = getApps().length ? getApp() : initializeApp(firebaseConfig);

      // Initialize services
      this.auth = getAuth(this.app);
      this.db = initializeFirestoreWithSettings(this.app);

      // Optional: Connect to Auth emulator in development
      if (process.env.NODE_ENV === 'development') {
        connectAuthEmulator(this.auth, 'http://localhost:9099');
      }

      // Set up auth state listener
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          // User is signed in
          return user;
        } else {
          // User is signed out
          return null;
        }
      });

    } catch (error) {
      toast.error('Failed to initialize Firebase. Please check your configuration.');
      throw error;
    }
  }

  public static getInstance(): FirebaseService {
    if (!FirebaseService.instance) {
      FirebaseService.instance = new FirebaseService();
    }
    return FirebaseService.instance;
  }

  // Add a method to reset the instance for testing or special cases
  public static resetInstance(): void {
    FirebaseService.instance = null;
  }
}

// Export a singleton instance
export const firebaseService = FirebaseService.getInstance();
