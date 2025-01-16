'use client';

import React from 'react';
import { useAuthStore } from '@/stores/authStore';
import { MilestoneTracker } from '@/components/features/MilestoneTracker';

export default function MilestonesPage() {
  const { _user } = useAuthStore();

  if (!_user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Milestones</h1>
        <p className="text-gray-600">Please sign in to view and track your milestones.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Milestones</h1>
      <MilestoneTracker userId={_user.uid} />
    </div>
  );
}
