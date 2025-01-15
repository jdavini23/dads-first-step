'use client';

import { motion } from 'framer-motion';
import { useMilestoneStore } from '@/stores/milestoneStore';
import { useAuthStore } from '@/stores/authStore';
import { defaultMilestones } from '@/utils/milestoneTemplates';
import { getMilestonesForUser, addDefaultMilestones } from '@/services/milestoneService';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { UserMilestone } from '@/types/milestone';
import Link from 'next/link';
import { MilestoneCard } from '@/components/milestones/MilestoneCard';

export const MilestoneOverview = () => {
  const user = useAuthStore((state) => state.user);
  const { milestones, setMilestones } = useMilestoneStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMilestones = async () => {
      if (!user) return;
      setIsLoading(true);
      try {
        const milestoneData = await getMilestonesForUser(user.uid);
        setMilestones(milestoneData);
      } catch (error) {
        console.error('Error fetching milestones:', error);
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
  const uniqueMilestones = defaultMilestones.slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-md p-6"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Your Baby's Milestones</h2>
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {uniqueMilestones.map((template) => {
            const TemplateIcon = template.icon;
            const userMilestone = milestones.find((m) => m.title === template.title);
            const status = userMilestone?.completed ? 'Completed' : 'In Progress';
            const statusColor = userMilestone?.completed
              ? 'bg-green-100 text-green-800'
              : 'bg-yellow-100 text-yellow-800';

            return (
              <div
                key={template.id}
                className="bg-gray-50 rounded-lg p-4 text-center hover:bg-gray-100 transition-colors"
              >
                <div className="flex justify-center mb-2">
                  <TemplateIcon className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="font-semibold text-sm mb-1">{template.title}</h3>
                <p className="text-xs text-gray-600 mb-2">
                  {template.minAge}-{template.maxAge} months
                </p>
                <span className={`text-xs px-2 py-1 rounded-full ${statusColor}`}>{status}</span>
              </div>
            );
          })}
        </div>
      )}
      <p className="text-gray-600 mt-4">
        Track your baby&apos;s progress and celebrate their achievements!
      </p>
    </motion.div>
  );
};
