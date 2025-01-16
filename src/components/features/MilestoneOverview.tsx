"use client";

import React, { useState, useEffect } from 'react';
import { useMilestoneStore } from '@/stores/milestoneStore';
import { useAuthStore } from '@/stores/authStore';
import { getMilestonesForUser } from '@/services/milestoneService';
import { Button } from '@/components/ui/Button';
import { Routes, RouteString } from '@/types/routes';
import { useRouter } from 'next/router';
import Link from 'next/link';

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

  const completedMilestones = milestones.filter(m => m.completed);
  const pendingMilestones = milestones.filter(m => !m.completed);

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Milestone Progress</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold">Completed</h3>
            <p className="text-3xl font-bold text-green-600">
              {completedMilestones.length}
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold">Pending</h3>
            <p className="text-3xl font-bold text-blue-600">
              {pendingMilestones.length}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Recent Milestones</h3>
        {pendingMilestones.slice(0, 3).map(milestone => (
          <div 
            key={milestone.id} 
            className="bg-gray-50 rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <h4 className="font-medium">{milestone.title}</h4>
              <p className="text-sm text-gray-600">{milestone.description}</p>
            </div>
            <Link href={`/milestones/${milestone.id}`}>
              <Button variant="outline">View Details</Button>
            </Link>
          </div>
        ))}

        {pendingMilestones.length === 0 && (
          <div className="text-center text-gray-500">
            No pending milestones. Great job!
          </div>
        )}
      </div>

      <div className="text-center mt-6">
        <Link href={Routes.milestones}>
          <Button>View All Milestones</Button>
        </Link>
      </div>
    </div>
  );
}
