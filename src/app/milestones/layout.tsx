import React from 'react';
import { APP_NAME } from '../constants';

export const metadata = {
  title: `${APP_NAME} - Milestones`,
  description: "Track and celebrate your baby's important milestones",
};

export default function MilestonesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
