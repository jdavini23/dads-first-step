import React, { ReactNode } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/config/firebase';

interface SignInButtonProps {
  children: ReactNode;
}

export const SignInButton = ({ children }: SignInButtonProps) => {
  const handleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch {
      // Silently handle sign-in errors
    }
  };

  return (
    <button
      onClick={handleSignIn}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
    >
      {children}
    </button>
  );
};
