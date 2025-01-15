import React from 'react';

import { motion } from 'framer-motion';
import { useMilestoneStore } from '@/stores/milestoneStore';
import { useAuthStore } from '@/stores/authStore';
import { getMilestonesForUser } from '@/services/milestoneService';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export const MilestoneOverview = () => {
  const user = useAuthStore((state) => state.user);
  const { milestones, setMilestones } = useMilestoneStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMilestones = async () => {
      if (!user) return;
      setIsLoading(true);
      try {
        const fetchedMilestones = await getMilestonesForUser(user.uid);
        setMilestones(fetchedMilestones);
      } catch {
        // Silently handle fetch errors
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchMilestones();
    }
  }, [user, setMilestones]);

  if (!user) {
    return (
      <div className="text-center py-8">
        <p>Please sign in to view your milestones</p>
      </div>
    );
  }

  if (isLoading) {
    return <div>Loading milestones...</div>;
  }

  // Get unique milestones by template ID
  const uniqueMilestones = milestones;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-md p-6"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Your Baby&apos;s Milestones</h2>
        <Link href="/milestones">
          <Button variant="outline">View All Milestones</Button>
        </Link>
      </div>

      {uniqueMilestones.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">No milestones tracked yet. Start your journey!</p>
          <Link href="/milestones">
            <Button>Add Milestones</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {uniqueMilestones.map((milestone) => (
            <div 
              key={milestone.id} 
              className="bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <h3 className="text-lg font-semibold">{milestone.title}</h3>
              <p className="text-gray-600">{milestone.description}</p>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};
