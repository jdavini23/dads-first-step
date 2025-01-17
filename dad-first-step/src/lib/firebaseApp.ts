import { initializeApp, getApps, FirebaseApp, getApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import {
  getFirestore,
  initializeFirestore,
  CACHE_SIZE_UNLIMITED,
  connectFirestoreEmulator,
} from 'firebase/firestore';
import { toast } from 'sonner';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Ensure Firebase is initialized
export const initializeFirebaseApp = () => {
  try {
    // Check if Firebase is already initialized
    if (getApps().length === 0) {
      const app = initializeApp(firebaseConfig);
      const auth = getAuth(app);
      const db = initializeFirestore(app, {
        cacheSizeBytes: CACHE_SIZE_UNLIMITED,
      });

      // Connect to emulators in development
      if (process.env.NODE_ENV === 'development') {
        connectAuthEmulator(auth, 'http://localhost:9099');
        connectFirestoreEmulator(db, 'localhost', 8080);
      }

      return { app, auth, db };
    }

    // If already initialized, return existing instances
    const app = getApp();
    const auth = getAuth(app);
    const db = getFirestore(app);

    return { app, auth, db };
  } catch (error) {
    console.error('Firebase initialization error:', error);
    toast.error('Failed to initialize Firebase');
    throw error;
  }
};

// Initialize and export Firebase services
export { app, auth, db } from '@/config/firebase';
