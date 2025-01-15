'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/authStore'
import { MilestoneCard } from '@/components/milestones/MilestoneCard'
import { MilestoneDialog } from '@/components/milestones/MilestoneDialog'
import { motion } from 'framer-motion'
import {
  FaBabyCarriage,
  FaSmile,
  FaWalking,
  FaBirthdayCake,
  FaBook,
  FaComments,
} from 'react-icons/fa'

// Define milestone data
const MILESTONES = [
  {
    id: 'first-smile',
    title: 'First Smile',
    description: 'That magical moment when your baby first smiles at you',
    icon: FaSmile,
    expectedAge: '6-8 weeks',
  },
  {
    id: 'first-word',
    title: 'First Word',
    description: 'The exciting moment when your baby says their first word',
    icon: FaComments,
    expectedAge: '9-14 months',
  },
  {
    id: 'first-steps',
    title: 'First Steps',
    description: 'Watch your little one take their first independent steps',
    icon: FaWalking,
    expectedAge: '9-15 months',
  },
  {
    id: 'first-book',
    title: 'First Book',
    description: 'Share the joy of reading with your baby',
    icon: FaBook,
    expectedAge: '6-12 months',
  },
  {
    id: 'first-food',
    title: 'First Solid Food',
    description: 'Introduce your baby to the world of solid foods',
    icon: FaBirthdayCake,
    expectedAge: '4-6 months',
  },
  {
    id: 'first-crawl',
    title: 'First Crawl',
    description: 'Your baby&apos;s first adventure in mobility',
    icon: FaBabyCarriage,
    expectedAge: '6-10 months',
  },
]

export default function MilestonesPage() {
  const user = useAuthStore((state) => state.user)
  const router = useRouter()
  const [selectedMilestone, setSelectedMilestone] = useState<typeof MILESTONES[0] | null>(null)
  const [completedMilestones, setCompletedMilestones] = useState<Record<string, { date: Date; notes: string }>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isInitialized, setIsInitialized] = useState(false)

  // Protect the route using useEffect
  useEffect(() => {
    if (!isInitialized) {
      setIsInitialized(true)
      return
    }

    const checkAuth = async () => {
      if (!user) {
        await router.push('/')
      } else {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [user, router, isInitialized])

  // Show loading state or nothing while checking authentication
  if (isLoading || !user) {
    return null
  }

  const handleMilestoneClick = (milestone: typeof MILESTONES[0]) => {
    setSelectedMilestone(milestone)
  }

  const handleSaveMilestone = (date: Date, notes: string) => {
    if (selectedMilestone) {
      setCompletedMilestones((prev) => ({
        ...prev,
        [selectedMilestone.id]: { date, notes },
      }))
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Welcome, {user.displayName}!
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Track and celebrate your baby&apos;s precious moments. Each milestone is a special step in their journey of growth.
          </p>
        </motion.div>

        {/* Milestone Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {MILESTONES.map((milestone) => (
            <motion.div key={milestone.id} variants={item}>
              <MilestoneCard
                {...milestone}
                isCompleted={milestone.id in completedMilestones}
                completedDate={
                  milestone.id in completedMilestones
                    ? completedMilestones[milestone.id].date
                    : undefined
                }
                onClick={() => handleMilestoneClick(milestone)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Milestone Dialog */}
        <MilestoneDialog
          isOpen={selectedMilestone !== null}
          onClose={() => setSelectedMilestone(null)}
          onSave={handleSaveMilestone}
          title={selectedMilestone?.title ?? ''}
          icon={selectedMilestone?.icon ?? FaBabyCarriage}
          expectedAge={selectedMilestone?.expectedAge ?? ''}
        />
      </div>
    </div>
  )
}
