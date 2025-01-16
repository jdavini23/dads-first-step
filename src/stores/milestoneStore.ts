import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserMilestone } from '@/types/milestone';

export interface MilestoneState {
  milestones: UserMilestone[];
  loading: boolean;
  error: Error | null;
  setMilestones: (milestones: UserMilestone[]) => void;
  addMilestone: (milestone: UserMilestone) => void;
  updateMilestone: (id: string, updates: Partial<UserMilestone>) => void;
  removeMilestone: (id: string) => void;
  filterMilestones: (filters: {
    type?: string;
    completed?: boolean;
  }) => UserMilestone[];
}

const useMilestoneStore = create<MilestoneState>()(
  persist(
    (set, get) => ({
      milestones: [],
      loading: false,
      error: null,
      setMilestones: (milestones) => set({ milestones }),
      addMilestone: (milestone) =>
        set((state) => ({
          milestones: [...state.milestones, milestone],
        })),
      updateMilestone: (id, updates) =>
        set((state) => ({
          milestones: state.milestones.map((m) => (m.id === id ? { ...m, ...updates } : m)),
        })),
      removeMilestone: (id) =>
        set((state) => ({
          milestones: state.milestones.filter((m) => m.id !== id),
        })),
      filterMilestones: ({ type, completed }) => {
        const { milestones } = get();
        return milestones.filter((milestone) => 
          (!type || milestone.type === type) && 
          (completed === undefined || milestone.completed === completed)
        );
      },
    }),
    {
      name: 'milestone-storage',
      partialize: (state) => ({
        milestones: state.milestones,
      }),
    }
  )
);

export { useMilestoneStore };
