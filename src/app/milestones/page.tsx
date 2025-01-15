'use client';

import { useState } from 'react';
import { MilestoneTracker } from '@/components/features/MilestoneTracker';
import { defaultMilestones, convertTemplateToMilestone } from '@/utils/milestoneTemplates';
import { useAuthStore } from '@/stores/authStore';
import { useMilestoneStore } from '@/stores/milestoneStore';
import { addUserMilestone } from '@/services/milestoneService';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';

export default function MilestonesPage() {
  const { user } = useAuthStore();
  const { addMilestone } = useMilestoneStore();
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);

  const handleAddMilestone = async (templateIndex: number) => {
    if (!user) {
      toast.error('Please sign in to add milestones');
      return;
    }

    const template = defaultMilestones[templateIndex];
    const newMilestone = convertTemplateToMilestone(template, user.uid);

    try {
      // Add to Firestore
      const firestoreMilestone = await addUserMilestone(newMilestone);

      // Update local store
      addMilestone(firestoreMilestone);

      toast.success(`Added milestone: ${newMilestone.title}`);
      setSelectedTemplate(null);
    } catch (error) {
      toast.error('Failed to add milestone');
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Baby&apos;s Milestones</h1>
      <p className="text-lg text-gray-600 mb-8">
        Track your child&apos;s growth and celebrate their achievements together.
      </p>

      {/* Existing Milestone Tracker */}
      <MilestoneTracker />

      {/* Milestone Templates Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Milestone Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {defaultMilestones.map((template, index) => {
            const TemplateIcon = template.icon;
            return (
              <div
                key={template.title}
                className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className="text-4xl text-blue-500 mr-4">
                    <TemplateIcon />
                  </div>
                  <h3 className="text-xl font-bold">{template.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{template.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {template.minAge}-{template.maxAge} months
                  </span>
                  <Button
                    onClick={() => handleAddMilestone(index)}
                    variant={selectedTemplate === index ? 'default' : 'outline'}
                  >
                    {selectedTemplate === index ? 'Adding...' : 'Add Milestone'}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
