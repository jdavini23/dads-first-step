import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { UserMilestone } from '@/types/milestone';

export interface MilestoneState {
  milestones: UserMilestone[];
  loading: boolean;
  error: Error | null;
  setMilestones: (milestones: UserMilestone[]) => void;
  addMilestone: (milestone: UserMilestone) => void;
  updateMilestone: (id: string, updates: Partial<UserMilestone>) => void;
  removeMilestone: (id: string) => void;
}

const useMilestoneStore = create<MilestoneState>()(
  persist(
    (set) => ({
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
    }),
    {
      name: 'milestone-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        milestones: state.milestones,
        loading: state.loading,
        error: state.error,
      }),
    }
  )
);

export { useMilestoneStore };
