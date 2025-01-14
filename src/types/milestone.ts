export interface Milestone {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  date: string;
  category: 'development' | 'social' | 'physical' | 'cognitive';
  ageRange: string;
  notes?: string;
}

export interface MilestoneState {
  milestones: Milestone[];
  loading: boolean;
  error: string | null;
}
