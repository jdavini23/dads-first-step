import React from 'react';

import Link from 'next/link';
import Image from 'next/image';
import { SignInButton } from '@/components/auth/SignInButton';
import { useAuthStore } from '@/stores/authStore';
import { signOut } from 'firebase/auth';
import { auth } from '@/config/firebase';

export const Header = () => {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // Clear user from store
      setUser(null);
    } catch {
      // Silently handle sign-out errors
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">Dad&apos;s First Step</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                {user.photoURL && (
                  <Image
                    src={user.photoURL}
                    alt="Profile"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                )}
                <button
                  onClick={handleSignOut}
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 h-9 px-4 py-2"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <SignInButton />
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
