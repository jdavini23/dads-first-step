'use client';

import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { useAuthStore } from '@/stores/authStore';

export function AuthInitializer() {
  const { setUser, setInitialized } = useAuthStore();

  useEffect(() => {
    if (!auth) {
      console.error('Firebase Auth is not initialized');
      setInitialized();
      return () => {};
    }

    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setUser(user);
        setInitialized();
      },
      (error) => {
        console.error('Auth state change error:', error);
        setInitialized();
      }
    );

    return () => unsubscribe();
  }, [setUser, setInitialized]);

  return null;
}
