'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from './ThemeProvider';
import { FirebaseProvider } from './FirebaseProvider';
import { Header } from '@/components/common/Header';
import dynamic from 'next/dynamic';

// Dynamically import Toaster with fallback
const Toaster = dynamic(() => import('sonner').then((mod) => mod.Toaster), {
  ssr: false,
  loading: () => null,
});

export function RootProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      forcedTheme={process.env.NODE_ENV === 'development' ? undefined : 'dark'}
    >
      <div className="min-h-screen bg-background">
        <FirebaseProvider>
          <Header />
          <main className="container mx-auto px-4 py-8">{children}</main>
          <Toaster position="top-right" richColors />
        </FirebaseProvider>
      </div>
    </ThemeProvider>
  );
}
