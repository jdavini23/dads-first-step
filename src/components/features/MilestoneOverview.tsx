'use client';

import React, { useState, useEffect } from 'react';
import { useMilestoneStore } from '@/stores/milestoneStore';
import { useAuthStore } from '@/stores/authStore';
import { getMilestonesForUser } from '@/services/milestoneService';
import { Button } from '@/components/ui/Button';
import { TypedLink } from '@/components/common/TypedLink';

export function MilestoneOverview() {
  const { _user } = useAuthStore();
  const { milestones, setMilestones } = useMilestoneStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMilestones = async () => {
      if (!_user) {
        setError('Please sign in to view milestones');
        setLoading(false);
        return;
      }

      try {
        const userMilestones = await getMilestonesForUser(_user.uid);
        setMilestones(userMilestones);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch milestones');
        setLoading(false);
      }
    };

    fetchMilestones();
  }, [_user, setMilestones]);

  if (loading) return <div>Loading milestones...</div>;
  if (error) return <div>{error}</div>;

  const completedMilestones = milestones.filter((m) => m.completed);
  const pendingMilestones = milestones.filter((m) => !m.completed);

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Milestone Progress</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Completed Milestones</h3>
            {completedMilestones.length > 0 ? (
              <ul className="space-y-2">
                {completedMilestones.map((milestone) => (
                  <li key={milestone.id} className="flex items-center justify-between">
                    <span>{milestone.title}</span>
                    <span className="text-green-600">✓</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No completed milestones yet</p>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Pending Milestones</h3>
            {pendingMilestones.length > 0 ? (
              <ul className="space-y-2">
                {pendingMilestones.map((milestone) => (
                  <li key={milestone.id} className="flex items-center justify-between">
                    <span>{milestone.title}</span>
                    <TypedLink 
                      route="MILESTONES_ADD" 
                      className="text-blue-500 hover:underline"
                    >
                      Edit
                    </TypedLink>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No pending milestones</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Button 
          variant="default" 
          onClick={() => {/* Add milestone */}}
        >
          Add New Milestone
        </Button>
      </div>
    </div>
  );
}
