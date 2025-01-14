import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { 
  MilestoneTrackerState, 
  UserMilestone, 
  MilestoneCategory 
} from '@/types/milestone'
import { getMilestonesForUser, updateUserMilestone } from '@/services/milestoneService'

const initialState: MilestoneTrackerState = {
  milestones: [],
  loading: false,
  error: null,
  filters: {}
}

export const useMilestoneStore = create<MilestoneTrackerState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        
        fetchMilestones: async (userId: string) => {
          set({ loading: true, error: null })
          try {
            const milestones = await getMilestonesForUser(userId)
            set({ milestones, loading: false })
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : 'Failed to fetch milestones', 
              loading: false 
            })
          }
        },

        updateMilestone: async (milestoneId: string, updates: Partial<UserMilestone>) => {
          try {
            await updateUserMilestone(milestoneId, updates)
            
            // Optimistically update local state
            set(state => ({
              milestones: state.milestones.map(milestone => 
                milestone.id === milestoneId 
                  ? { ...milestone, ...updates } 
                  : milestone
              )
            }))
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : 'Failed to update milestone' 
            })
          }
        },

        setFilters: (filters) => {
          set({ filters })
        },

        getFilteredMilestones: () => {
          const { milestones, filters } = get()
          return milestones.filter(milestone => {
            if (filters.category && milestone.category !== filters.category) return false
            if (filters.minProgress !== undefined && milestone.progress < filters.minProgress) return false
            if (filters.completed !== undefined && milestone.completed !== filters.completed) return false
            return true
          })
        },

        reset: () => set(initialState)
      }),
      {
        name: 'milestone-storage',
        partialize: (state) => ({
          milestones: state.milestones,
          filters: state.filters
        })
      }
    )
  )
)
