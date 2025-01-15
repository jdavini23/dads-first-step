'use client';

import { motion } from 'framer-motion';
import { IconType } from 'react-icons';
import { format } from 'date-fns';
import { UserMilestone } from '@/types/milestone';
import { FaBaby } from 'react-icons/fa';

interface MilestoneCardProps {
  milestone?: UserMilestone;
  title?: string;
  description?: string;
  icon?: IconType;
  expectedAge?: string;
  isCompleted?: boolean;
  completedDate?: Date;
  onClick?: () => void;
  compact?: boolean;
}

export const MilestoneCard = ({
  milestone,
  title = milestone?.title,
  description = milestone?.description,
  icon: Icon = FaBaby,
  expectedAge = milestone ? `${milestone.minAge} months` : '',
  isCompleted = milestone?.completed || false,
  completedDate = milestone?.completedAt ? new Date(milestone.completedAt) : undefined,
  onClick = () => {},
  compact = false,
}: MilestoneCardProps) => {
  if (!title) return null;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative overflow-hidden rounded-xl p-6 cursor-pointer
        ${
          isCompleted
            ? 'bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-emerald-200'
            : 'bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-blue-200'
        }
        ${compact ? 'p-4 text-sm' : ''}
      `}
      onClick={onClick}
    >
      {/* Achievement Badge */}
      {isCompleted && (
        <div className="absolute top-3 right-3">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="bg-emerald-500 text-white p-2 rounded-full"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </motion.div>
        </div>
      )}

      {/* Icon */}
      <div
        className={`
        w-12 h-12 rounded-full flex items-center justify-center mb-4
        ${isCompleted ? 'bg-emerald-200 text-emerald-600' : 'bg-blue-200 text-blue-600'}
      `}
      >
        <Icon className="w-6 h-6" />
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>

      {/* Expected Age */}
      <div className="flex items-center text-sm text-gray-500">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Expected: {expectedAge}</span>
      </div>

      {/* Completion Date */}
      {isCompleted && completedDate && (
        <div className="mt-2 text-sm text-emerald-600">
          <svg
            className="w-4 h-4 inline mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          Achieved: {format(completedDate, 'MMM d, yyyy')}
        </div>
      )}
    </motion.div>
  );
};
