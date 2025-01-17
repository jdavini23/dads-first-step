import React, { ReactNode, cloneElement, isValidElement } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { useAuthStore } from '@/stores/authStore';
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
    } catch {
      // Silently handle sign-in errors
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
      ),
    });
  }

  return (
    <button onClick={handleSignIn} className={`flex items-center justify-center ${className}`}>
      <FaGoogle className="mr-2" />
      {children || 'Sign in with Google'}
    </button>
  );
};
