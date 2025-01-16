export enum MilestoneType {
  PHYSICAL = 'PHYSICAL',
  COGNITIVE = 'COGNITIVE',
  SOCIAL = 'SOCIAL',
  EMOTIONAL = 'EMOTIONAL',
}

export enum MilestoneCategory {
  PHYSICAL = 'physical',
  COGNITIVE = 'cognitive',
  SOCIAL = 'social',
  EMOTIONAL = 'emotional',
}

export enum MilestoneDifficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM', 
  HARD = 'HARD',
}

export type Milestone = {
  id: string;
  title: string;
  description: string;
  type: MilestoneType;
  category: MilestoneCategory;
  difficulty: MilestoneDifficulty;
  date: Date;
  completed: boolean;
};

export type UserMilestone = Milestone & {
  userId: string;
  minAge?: number;
  maxAge?: number;
  progress?: number;
  completedAt?: Date | null;
  notes?: string;
  resources?: string[];
  skills?: string[];
  createdAt?: string;
  updatedAt?: string;
};

export type MilestoneFilters = {
  type?: MilestoneType;
  category?: MilestoneCategory;
  difficulty?: MilestoneDifficulty;
  completed?: boolean;
};

export const filterMilestones = (
  milestones: UserMilestone[], 
  filters: MilestoneFilters
): UserMilestone[] => {
  return milestones.filter((milestone) => 
    (!filters.type || milestone.type === filters.type) && 
    (!filters.category || milestone.category === filters.category) &&
    (!filters.difficulty || milestone.difficulty === filters.difficulty) &&
    (filters.completed === undefined || milestone.completed === filters.completed)
  );
};

export const createMilestone = (
  userId: string, 
  milestone: Omit<UserMilestone, 'id'>
): UserMilestone => {
  return {
    id: Date.now().toString(),
    ...milestone,
  };
};
