"use client";

import React from 'react';
import { useState, useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useMilestoneStore } from '@/stores/milestoneStore';
import { getMilestonesForUser } from '@/services/milestoneService';
import { MilestoneCategory, UserMilestone } from '@/types/milestone';
import { defaultMilestones } from '@/utils/milestoneTemplates';

interface MilestoneTrackerProps {
  userId: string;
}

export const MilestoneTracker: React.FC<MilestoneTrackerProps> = ({ userId }) => {
  const { milestones, setMilestones } = useMilestoneStore();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<MilestoneCategory | 'ALL'>('ALL');

  useEffect(() => {
    const fetchMilestones = async () => {
      if (!userId) return;
      setIsLoading(true);
      try {
        const data = await getMilestonesForUser(userId);
        setMilestones(data);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchMilestones();
    }
  }, [userId, setMilestones]);

  if (!userId) {
    return <div>Please sign in to view milestones</div>;
  }

  if (isLoading) {
    return <div>Loading milestones...</div>;
  }

  // Create a map of existing user milestones by template title
  const userMilestoneMap = new Map(milestones.map((milestone) => [milestone.title, milestone]));

  // Filter templates by category if selected
  const filteredTemplates = defaultMilestones.filter(
    (template) => selectedCategory === 'ALL' || template.category === selectedCategory
  );

  return (
    <div className="space-y-6">
      <div className="flex gap-2 overflow-x-auto pb-4">
        <button
          onClick={() => setSelectedCategory('ALL')}
          className={`px-4 py-2 rounded-lg ${
            selectedCategory === 'ALL'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        {Object.values(MilestoneCategory).map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template, index) => {
          const userMilestone = userMilestoneMap.get(template.title);
          return (
            <div
              key={index}
              className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-3">{template.title}</h3>
              <p className="text-gray-600 mb-4">{template.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-blue-600 font-medium">{template.category}</span>
                {userMilestone ? (
                  <span className="text-green-600 font-medium">✓ Completed</span>
                ) : (
                  <button
                    onClick={() => {
                      // Handle adding milestone
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
