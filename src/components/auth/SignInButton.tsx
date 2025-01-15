'use client';

import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { useAuthStore } from '@/stores/authStore';
import { ReactNode, cloneElement, isValidElement } from 'react';
import { FaGoogle } from 'react-icons/fa';

interface SignInButtonProps {
  children?: ReactNode;
  className?: string;
}

type ChildProps = {
  onClick?: () => void;
  children?: ReactNode;
};

export const SignInButton = ({ children, className }: SignInButtonProps) => {
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

  // If children is a Button component, clone and add onClick
  if (isValidElement<ChildProps>(children)) {
    return cloneElement(children, {
      onClick: handleSignIn,
      children: (
        <>
          <FaGoogle className="mr-2" />
          {children.props.children}
        </>
      )
    });
  }

  // Default button rendering
  return (
    <button
      onClick={handleSignIn}
      className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 ${className || ''}`}
    >
      <FaGoogle className="mr-2" />
      {children || 'Sign In with Google'}
    </button>
  );
};
