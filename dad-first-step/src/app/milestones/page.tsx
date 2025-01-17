'use client';

import React from 'react';
import Image from 'next/image';
import { useAuthStore } from '@/stores/authStore';
import { MilestoneTracker } from '@/components/features/MilestoneTracker';
import { Button } from '@/components/ui/Button';
import { TypedLink } from '@/components/common/TypedLink';
import { Routes } from '@/types/routes';
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Milestone illustration components
const MilestoneIllustration = () => (
  <motion.div 
    className="relative w-full max-w-2xl mx-auto mb-12"
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6 }}
  >
    <Image 
      src="/illustrations/milestone-celebration.svg" 
      alt="Baby Milestone Celebration" 
      width={800} 
      height={600} 
      className="w-full h-auto object-contain"
      priority
    />
  </motion.div>
);

const MilestoneFeatures = () => (
  <motion.div 
    className="grid md:grid-cols-3 gap-8 mb-16"
    variants={stagger}
    initial="initial"
    animate="animate"
  >
    {[
      { 
        icon: "🌟", 
        title: "Personalized Tracking", 
        description: "Create a custom timeline of your baby's unique milestones",
        color: "bg-blue-50 hover:bg-blue-100" 
      },
      { 
        icon: "📸", 
        title: "Memory Keeper", 
        description: "Capture and preserve memories with photos and notes",
        color: "bg-pink-50 hover:bg-pink-100"
      },
      { 
        icon: "📊", 
        title: "Growth Insights", 
        description: "Understand developmental progress with visual insights",
        color: "bg-green-50 hover:bg-green-100"
      }
    ].map(({ icon, title, description, color }, index) => (
      <motion.div 
        key={index} 
        variants={fadeInUp}
        className={`${color} p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all text-center transform hover:-translate-y-1`}
      >
        <div className="text-5xl mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </motion.div>
    ))}
  </motion.div>
);

export default function MilestonesPage() {
  const { _user } = useAuthStore();

  if (!_user) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-pink-500 bg-clip-text text-transparent">
            Celebrate Every Milestone
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Document and cherish every precious moment of your baby's growth journey
          </p>
          
          <div className="flex justify-center space-x-4">
            <TypedLink route={Routes.SIGN_UP}>
              <Button 
                variant="default" 
                size="lg" 
                className="bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                Start Your Journey
              </Button>
            </TypedLink>
            <TypedLink route={Routes.AUTH}>
              <Button 
                variant="outline" 
                size="lg" 
                className="shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
              >
                Sign In
              </Button>
            </TypedLink>
          </div>
        </motion.div>

        <MilestoneIllustration />
        <MilestoneFeatures />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Milestones</h1>
      <MilestoneTracker userId={_user.uid} />
    </div>
  );
}
