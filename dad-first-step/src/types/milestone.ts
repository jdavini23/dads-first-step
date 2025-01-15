export enum MilestoneCategory {
  PHYSICAL = 'physical',
  COGNITIVE = 'cognitive',
  SOCIAL = 'social',
  EMOTIONAL = 'emotional'
}

export enum MilestoneDifficulty {
  EASY = 'easy',
  MODERATE = 'moderate',
  CHALLENGING = 'challenging'
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  category: MilestoneCategory;
  minAge: number; // in months
  maxAge: number; // in months
  difficulty: MilestoneDifficulty;
  skills: string[];
  resources?: string[];
}

export interface UserMilestone extends Milestone {
  userId: string;
  completed: boolean;
  completedAt?: Date;
  notes?: string;
  progress: number; // 0-100
}

export interface MilestoneTrackerState {
  milestones: UserMilestone[];
  loading: boolean;
  error: string | null;
  filters: {
    category?: MilestoneCategory;
    minProgress?: number;
    completed?: boolean;
  };
  fetchMilestones: (userId: string) => Promise<void>;
  updateMilestone: (milestoneId: string, updates: Partial<UserMilestone>) => Promise<void>;
  getFilteredMilestones: () => UserMilestone[];
  setFilters: (filters: MilestoneTrackerState['filters']) => void;
  reset: () => void;
}

export interface MilestoneService {
  getMilestones(userId: string): Promise<UserMilestone[]>;
  addMilestone(milestone: UserMilestone): Promise<void>;
  updateMilestone(milestoneId: string, updates: Partial<UserMilestone>): Promise<void>;
  deleteMilestone(milestoneId: string): Promise<void>;
}
