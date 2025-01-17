import React from 'react';
import { useAuthStore } from '../stores/authStore';
import { useMilestoneStore } from '../stores/milestoneStore';

export default function DebugPage() {
  const { _user } = useAuthStore();
  const { milestones } = useMilestoneStore();

  return (
    <div>
      <h1>Debug Page</h1>
      <pre>{JSON.stringify(_user, null, 2)}</pre>
      <pre>{JSON.stringify(milestones, null, 2)}</pre>
    </div>
  );
}