"use client";

import React, { memo } from 'react';
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
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

interface FeatureCardProps {
  icon: typeof FaBaby;
  title: string;
  description: string;
}

const FeatureCard = memo(({ icon: Icon, title, description }: FeatureCardProps) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white shadow-lg rounded-xl p-6 text-center transition-all"
    role="article"
    aria-labelledby={`feature-${title.replace(/\s+/g, '-').toLowerCase()}`}
  >
    <div className="mb-4 flex justify-center">
      <Icon 
        className="w-12 h-12 text-blue-600" 
        aria-hidden="true" 
      />
    </div>
    <h3 
      id={`feature-${title.replace(/\s+/g, '-').toLowerCase()}`} 
      className="text-xl font-bold mb-3 text-gray-800"
    >
      {title}
    </h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
));

FeatureCard.displayName = 'FeatureCard';

export default function Home() {
  const { _user } = useAuthStore();

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <main 
        className="min-h-screen bg-gradient-to-br from-blue-50 to-white" 
        aria-label="Dad's First Step Home Page"
      >
        {/* Hero Section */}
        <div 
          className="container mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center" 
          role="region" 
          aria-label="Hero Section"
        >
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
              <Link 
                href={{ pathname: Routes.milestones } as UrlObject}
                aria-label="Track Milestones"
              >
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
            <Link 
              href={{ pathname: Routes.about } as UrlObject}
              aria-label="Learn More About Dad's First Step"
            >
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
                alt="Father and Baby Illustration"
                width={500}
                height={500}
                className="w-full h-auto rounded-lg shadow-2xl"
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* Features Section */}
        <section 
          className="container mx-auto px-4 py-16" 
          aria-labelledby="features-heading"
        >
          <h2 
            id="features-heading" 
            className="text-4xl font-bold text-center mb-12 text-gray-900"
          >
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
        </section>

        {/* Personalized Section */}
        {_user && (
          <section 
            className="container mx-auto px-4 py-16" 
            aria-label="Personalized Milestone Overview"
          >
            <MilestoneOverview />
          </section>
        )}

        {/* Call to Action */}
        <section 
          className="bg-blue-600 text-white py-16" 
          aria-labelledby="cta-heading"
        >
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 
                id="cta-heading" 
                className="text-4xl font-bold mb-6"
              >
                Your Fatherhood Journey Matters
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Every dad&apos;s path is unique. We&apos;re here to support, guide, and celebrate you
                every step of the way.
              </p>

              {_user ? (
                <Link 
                  href={{ pathname: Routes.milestones } as UrlObject}
                  aria-label="View Your Milestones"
                >
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
                  <Button 
                    size="lg" 
                    className="bg-white text-blue-600 hover:bg-blue-50"
                  >
                    Join Now
                  </Button>
                </SignInButton>
              )}
            </motion.div>
          </div>
        </section>
      </main>
    </ErrorBoundary>
  );
}
