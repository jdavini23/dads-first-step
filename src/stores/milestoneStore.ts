import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Milestone = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
};

type MilestoneState = {
  milestones: Milestone[];
  addMilestone: (milestone: Milestone) => void;
  removeMilestone: (id: string) => void;
  updateMilestone: (id: string, updates: Partial<Milestone>) => void;
};

export const useMilestoneStore = create<MilestoneState>()(
  persist(
    (set) => ({
      milestones: [],
      addMilestone: (milestone) => 
        set((state) => ({ milestones: [...state.milestones, milestone] })),
      removeMilestone: (id) => 
        set((state) => ({ 
          milestones: state.milestones.filter(m => m.id !== id) 
        })),
      updateMilestone: (id, updates) => 
        set((state) => ({
          milestones: state.milestones.map(m => 
            m.id === id ? { ...m, ...updates } : m
          )
        })),
    }),
    {
      name: 'milestone-storage',
      version: 1,
      migrate: (persistedState: any, version: number) => {
        try {
          // Migration strategy to handle different versions of persisted state
          if (!persistedState || version === 0) {
            // If no version or old version, reset to initial state
            return { milestones: [] };
          }
          
          // Validate persisted state structure
          if (Array.isArray(persistedState.milestones)) {
            const validMilestones = persistedState.milestones.filter((m: any) => 
              m && typeof m.id === 'string' && typeof m.title === 'string'
            );
            return { milestones: validMilestones };
          }
          
          // If validation fails, reset
          return { milestones: [] };
        } catch (error) {
          console.error('Migration error:', error);
          return { milestones: [] };
        }
      },
      onRehydrateStorage: () => (state) => {
        if (!state || !Array.isArray(state.milestones)) {
          state = { ...state, milestones: [] };
        }
      },
      getStorage: () => localStorage,
    }
  )
);
