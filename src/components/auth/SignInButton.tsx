'use client';

import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { useAuthStore } from '@/stores/authStore';
import { ReactNode } from 'react';

interface SignInButtonProps {
  children?: ReactNode;
}

export const SignInButton = ({ children }: SignInButtonProps) => {
  const setUser = useAuthStore((state) => state.setUser);

  const handleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  return (
    <button
      onClick={handleSignIn}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
    >
      {children || 'Sign In with Google'}
    </button>
  );
};
