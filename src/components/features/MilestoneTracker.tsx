'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
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
  const [isLoading, setIsLoading] = useState(false)

  // Memoize fetchMilestones to prevent unnecessary re-renders
  const memoizedFetchMilestones = useCallback((uid: string) => {
    fetchMilestones(uid)
  }, [fetchMilestones])

  useEffect(() => {
    if (user?.uid) {
      memoizedFetchMilestones(user.uid)
    }
  }, [user?.uid, memoizedFetchMilestones])

  const handleAddTemplate = useCallback(async () => {
    if (!user?.uid) return

    setIsLoading(true)
    try {
      const templates = getMilestoneTemplates()
      for (const template of templates) {
        await addUserMilestone({
          ...template,
          userId: user.uid
        })
      }

      memoizedFetchMilestones(user.uid)
    } catch (error) {
      console.error('Failed to add templates', error)
    } finally {
      setIsLoading(false)
    }
  }, [user?.uid, memoizedFetchMilestones])

  const handleUpdateProgress = useCallback((milestone: UserMilestone, progress: number) => {
    updateMilestone(milestone.id, { 
      progress, 
      completed: progress === 100 
    })
  }, [updateMilestone])

  // Memoize filtered milestones to prevent unnecessary re-renders
  const filteredMilestones = useMemo(() => {
    return selectedCategory 
      ? milestones.filter(m => m.category === selectedCategory)
      : milestones
  }, [milestones, selectedCategory])

  // Memoize category buttons to prevent unnecessary re-renders
  const categoryButtons = useMemo(() => 
    Object.values(MilestoneCategory).map((category) => (
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
    )), [selectedCategory]
  )

  if (!user) {
    return <div>Please log in to track milestones</div>
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Milestone Tracker</h2>

      <div className="mb-4 flex space-x-2">
        {categoryButtons}
        <button 
          onClick={() => setSelectedCategory(null)}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          All
        </button>
      </div>

      <button 
        onClick={handleAddTemplate}
        disabled={isLoading}
        className={`
          mb-4 px-4 py-2 rounded 
          ${isLoading 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-green-500 text-white hover:bg-green-600'
          }
        `}
      >
        {isLoading ? 'Adding...' : 'Add Default Milestones'}
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
