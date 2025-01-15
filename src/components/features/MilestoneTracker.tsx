'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useMilestoneStore } from '@/stores/milestoneStore';
import { getMilestonesForUser } from '@/services/milestoneService';
import { MilestoneCategory } from '@/types/milestone';
import { defaultMilestones } from '@/utils/milestoneTemplates';

export const MilestoneTracker = () => {
  const user = useAuthStore((state) => state.user);
  const { milestones, setMilestones } = useMilestoneStore();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<MilestoneCategory | 'ALL'>('ALL');

  useEffect(() => {
    const fetchMilestones = async () => {
      if (!user) return;
      setIsLoading(true);
      try {
        const data = await getMilestonesForUser(user.uid);
        setMilestones(data);
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
          className={`px-4 py-2 rounded-full text-sm ${
            selectedCategory === 'ALL' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
          }`}
        >
          All
        </button>
        {Object.values(MilestoneCategory).map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
              selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => {
          const userMilestone = userMilestoneMap.get(template.title);
          const TemplateIcon = template.icon;

          return (
            <div
              key={template.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <TemplateIcon className="w-6 h-6 text-blue-500" />
                <h3 className="text-xl font-semibold">{template.title}</h3>
              </div>
              <p className="text-gray-600 mb-4">{template.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {template.skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {template.minAge}-{template.maxAge} months
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    userMilestone?.completed
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {userMilestone?.completed ? 'Completed' : 'In Progress'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
