import { IconType } from 'react-icons';
import { FaSmile, FaChild, FaBook, FaWalking, FaMusic } from 'react-icons/fa';
import { MilestoneCategory, MilestoneDifficulty, UserMilestone } from '@/types/milestone';

interface MilestoneTemplate {
  id: string;
  title: string;
  description: string;
  category: MilestoneCategory;
  minAge: number;
  maxAge: number;
  difficulty: MilestoneDifficulty;
  icon: IconType;
  skills: string[];
  resources?: string[];
}

export const defaultMilestones: MilestoneTemplate[] = [
  {
    id: '1',
    title: 'First Smile',
    description: 'Your baby\'s first social smile, typically in response to your face or voice',
    category: MilestoneCategory.SOCIAL,
    minAge: 1,
    maxAge: 3,
    difficulty: MilestoneDifficulty.EASY,
    icon: FaSmile,
    skills: ['Social Interaction', 'Emotional Development'],
    resources: ['Understanding baby smiles', 'Social development tips']
  },
  {
    id: '2',
    title: 'Rolling Over',
    description: 'Baby can roll from back to tummy and tummy to back',
    category: MilestoneCategory.PHYSICAL,
    minAge: 3,
    maxAge: 6,
    difficulty: MilestoneDifficulty.MEDIUM,
    icon: FaChild,
    skills: ['Gross Motor Skills', 'Core Strength'],
    resources: ['Tummy time exercises', 'Rolling over safety']
  },
  {
    id: '3',
    title: 'First Words',
    description: 'Your baby saying their first meaningful words',
    category: MilestoneCategory.COGNITIVE,
    minAge: 9,
    maxAge: 14,
    difficulty: MilestoneDifficulty.MEDIUM,
    icon: FaBook,
    skills: ['Language Development', 'Communication'],
    resources: ['Language development activities', 'Speech milestones']
  },
  {
    id: '4',
    title: 'Walking',
    description: 'Taking first independent steps',
    category: MilestoneCategory.PHYSICAL,
    minAge: 9,
    maxAge: 18,
    difficulty: MilestoneDifficulty.MEDIUM,
    icon: FaWalking,
    skills: ['Gross Motor Skills', 'Balance', 'Coordination'],
    resources: ['Walking safety tips', 'Encouraging independent walking']
  },
  {
    id: '5',
    title: 'Musical Response',
    description: 'Moving to music and showing rhythm awareness',
    category: MilestoneCategory.COGNITIVE,
    minAge: 6,
    maxAge: 12,
    difficulty: MilestoneDifficulty.EASY,
    icon: FaMusic,
    skills: ['Musical Intelligence', 'Rhythm Recognition', 'Motor Skills'],
    resources: ['Baby music activities', 'Musical development tips']
  }
];

export function convertTemplateToMilestone(
  template: MilestoneTemplate,
  userId?: string
): UserMilestone {
  const now = new Date();
  return {
    id: crypto.randomUUID(),
    userId: userId || '',
    title: template.title,
    description: template.description,
    category: template.category,
    minAge: template.minAge,
    maxAge: template.maxAge,
    difficulty: template.difficulty,
    completed: false,
    progress: 0,
    skills: template.skills,
    resources: template.resources || [],
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  };
}
