'use client'

import { useState, useEffect } from 'react'
import { useMilestoneStore } from '@/stores/milestoneStore'
import { useAuthStore } from '@/stores/authStore'
import { getMilestoneTemplates, addUserMilestone } from '@/services/milestoneService'
import { MilestoneCard } from '@/components/milestones/MilestoneCard'
import { UserMilestone } from '@/types/milestone'
import { toast } from 'sonner'

export const MilestoneTracker = () => {
  const { user } = useAuthStore()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { milestones, addMilestone } = useMilestoneStore()

  const handleAddDefaultMilestones = async () => {
    if (!user) {
      toast.error('Please sign in to add milestones')
      return
    }

    setIsLoading(true)
    try {
      const templates = await getMilestoneTemplates()
      
      for (const template of templates) {
        const newMilestone: UserMilestone = {
          ...template,
          userId: user.uid,
          id: '' // Will be set by Firestore
        }

        const milestoneId = await addUserMilestone(newMilestone)
        
        addMilestone({
          ...newMilestone,
          id: milestoneId
        })
      }

      toast.success('Default milestones added successfully!')
    } catch (error) {
      console.error('Failed to add milestones:', error)
      toast.error('Failed to add milestones. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="space-x-2">
          {/* Category selection buttons can be added here */}
        </div>
        <button
          onClick={handleAddDefaultMilestones}
          disabled={isLoading || !user}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isLoading ? 'Adding...' : 'Add Default Milestones'}
        </button>
      </div>

      <div className="space-y-4">
        {milestones.length > 0 ? (
          milestones.map((milestone) => (
            <MilestoneCard 
              key={milestone.id}
              title={milestone.title}
              description={milestone.description}
              icon={() => null} // Replace with actual icon logic
              expectedAge={`${milestone.minAge}-${milestone.maxAge} months`}
              isCompleted={milestone.completed}
              onClick={() => {
                // Add milestone interaction logic
              }}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">
            No milestones yet. Add some to get started!
          </p>
        )}
      </div>
    </div>
  )
}
