"use client";

import React from 'react';
import Link from 'next/link';
import { UrlObject } from 'url';
import { Routes, Route } from '@/types/routes';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaBaby, FaHeart, FaBook, FaCalendarCheck } from 'react-icons/fa';
import { MilestoneOverview } from '@/components/features/MilestoneOverview';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/stores/authStore';
import { SignInButton } from '@/components/auth/SignInButton';

interface FeatureCardProps {
  icon: typeof FaBaby;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white shadow-lg rounded-xl p-6 text-center transition-all"
  >
    <div className="mb-4 flex justify-center">
      <Icon className="w-12 h-12 text-blue-600" />
    </div>
    <h3 className="text-xl font-bold mb-3 text-gray-800">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

export default function Home() {
  const { _user } = useAuthStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold mb-6 text-gray-900">
            Your Journey into Fatherhood Starts Here
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Dad&apos;s First Step is more than an app. It&apos;s your companion through the most
            transformative adventure of your life.
          </p>

          {_user ? (
            <Link href={{ pathname: Routes.milestones } as UrlObject}>
              <Button size="lg" className="mr-4">
                Track Milestones
              </Button>
            </Link>
          ) : (
            <SignInButton>
              <Button size="lg" className="mr-4">
                Get Started
              </Button>
            </SignInButton>
          )}
         <Link href={{ pathname: Routes.about } as UrlObject}>
  <Button variant="outline" size="lg">
    Learn More
  </Button>
</Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden md:block"
        >
          <div className="bg-blue-100 rounded-full p-8">
            <Image
              src="/dad-baby-illustration.svg"
              alt="Father and Baby"
              width={500}
              height={500}
              className="w-full h-auto rounded-lg shadow-2xl"
            />
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
          Empowering Dads, One Milestone at a Time
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          <FeatureCard
            icon={FaBaby}
            title="Milestone Tracking"
            description="Capture and celebrate every precious moment of your child's development."
          />
          <FeatureCard
            icon={FaHeart}
            title="Emotional Support"
            description="Resources and community to support you through fatherhood's challenges."
          />
          <FeatureCard
            icon={FaBook}
            title="Learning Resources"
            description="Expert guides and tips to help you navigate parenting confidently."
          />
          <FeatureCard
            icon={FaCalendarCheck}
            title="Progress Insights"
            description="Understand your child's growth and developmental stages."
          />
        </div>
      </div>

      {/* Personalized Section */}
      {_user && (
        <div className="container mx-auto px-4 py-16">
          <MilestoneOverview />
        </div>
      )}

      {/* Call to Action */}
      <div className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-6">Your Fatherhood Journey Matters</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Every dad&apos;s path is unique. We&apos;re here to support, guide, and celebrate you
              every step of the way.
            </p>

            {_user ? (
              <Link href={{ pathname: Routes.milestones } as UrlObject}>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-white border-white hover:bg-white hover:text-blue-600"
                >
                  View Your Milestones
                </Button>
              </Link>
            ) : (
              <SignInButton>
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                  Join Now
                </Button>
              </SignInButton>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
