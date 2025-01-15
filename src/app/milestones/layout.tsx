import React from 'react';
import { Metadata } from 'next';
import { APP_NAME } from '../constants'
import { RootProvider } from '@/components/providers/RootProvider'

export const metadata: Metadata = {
  title: `Milestones | ${APP_NAME}`,
  description: "Track and celebrate your baby's important milestones",
};

export default function MilestonesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <RootProvider>{children}</RootProvider>
    </div>
  );
}
