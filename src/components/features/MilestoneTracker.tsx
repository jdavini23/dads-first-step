'use client'

import { useState, useEffect } from 'react'
import { useMilestoneStore } from '@/stores/milestoneStore'
import { useAuthStore } from '@/stores/authStore'
import { MilestoneCategory, UserMilestone } from '@/types/milestone'
import { getMilestoneTemplates, addUserMilestone } from '@/services/milestoneService'

export const MilestoneTracker = () => {
  const user = useAuthStore((state) => state.user)
  const { 
    milestones, 
    fetchMilestones, 
    updateMilestone, 
    getFilteredMilestones 
  } = useMilestoneStore()

  const [selectedCategory, setSelectedCategory] = useState<MilestoneCategory | null>(null)

  useEffect(() => {
    if (user?.uid) {
      fetchMilestones(user.uid)
    }
  }, [user?.uid, fetchMilestones])

  const handleAddTemplate = async () => {
    if (!user?.uid) return

    const templates = getMilestoneTemplates()
    for (const template of templates) {
      await addUserMilestone({
        ...template,
        userId: user.uid
      })
    }

    fetchMilestones(user.uid)
  }

  const handleUpdateProgress = (milestone: UserMilestone, progress: number) => {
    updateMilestone(milestone.id, { 
      progress, 
      completed: progress === 100 
    })
  }

  const filteredMilestones = getFilteredMilestones()

  if (!user) {
    return <div>Please log in to track milestones</div>
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Milestone Tracker</h2>

      <div className="mb-4 flex space-x-2">
        {Object.values(MilestoneCategory).map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded ${
              selectedCategory === category 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
        <button 
          onClick={() => setSelectedCategory(null)}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          All
        </button>
      </div>

      <button 
        onClick={handleAddTemplate}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
      >
        Add Default Milestones
      </button>

      <div className="space-y-4">
        {filteredMilestones.map((milestone) => (
          <div 
            key={milestone.id} 
            className="border p-4 rounded-lg flex items-center"
          >
            <div className="flex-grow">
              <h3 className="font-bold">{milestone.title}</h3>
              <p className="text-sm text-gray-600">{milestone.description}</p>
              <div className="mt-2 bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${milestone.progress}%` }}
                ></div>
              </div>
            </div>
            <div className="ml-4">
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={milestone.progress} 
                onChange={(e) => handleUpdateProgress(
                  milestone, 
                  Number(e.target.value)
                )}
                className="w-40"
              />
              <span className="ml-2">{milestone.progress}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
