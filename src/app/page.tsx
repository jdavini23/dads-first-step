"use client";

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/stores/authStore';
import { SignInButton } from '@/components/auth/SignInButton';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { FaBaby, FaHeart, FaBook, FaCalendarCheck } from 'react-icons/fa';
import { MilestoneOverview } from '@/components/features/MilestoneOverview';
import { Routes, createRoute } from '@/types/routes';

// Skeleton loader for illustration
const IllustrationLoader = () => (
  <div className="w-full h-64 bg-primary-100 animate-pulse rounded-lg"></div>
);

interface FeatureCardProps {
  icon: typeof FaBaby;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = React.memo(({ icon: Icon, title, description }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white shadow-lg rounded-xl p-6 text-center transition-all hover:shadow-xl border border-primary-100"
    role="article"
  >
    <div className="mb-4 flex justify-center">
      <Icon className="text-4xl text-primary-500" />
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </motion.div>
))

FeatureCard.displayName = 'FeatureCard';

export default function Home() {
  const { _user } = useAuthStore();

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <main className="min-h-screen font-body">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50">
          <div className="absolute inset-0 bg-gradient-waves opacity-30" />
          <div 
            className="container relative mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center" 
            role="region" 
            aria-label="Hero Section"
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative z-10"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-accent-100 text-accent-700 text-sm font-semibold mb-6">
                Welcome to Fatherhood
              </span>
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-neutral-900 leading-tight">
                Your Journey into{' '}
                <span className="text-gradient bg-gradient-to-r from-primary-600 to-accent-500">
                  Fatherhood
                </span>{' '}
                Starts Here
              </h1>
              <p className="text-lg md:text-xl text-neutral-600 mb-8 leading-relaxed">
                Dad&apos;s First Step is more than an app. It&apos;s your companion through the most
                transformative adventure of your life.
              </p>

              <div className="flex flex-wrap gap-4">
                {_user ? (
                  <Link 
                    href={createRoute(Routes.milestones)}
                    aria-label="Track Milestones"
                  >
                    <Button size="lg" className="bg-primary-500 hover:bg-primary-600 text-white shadow-lg hover:shadow-xl transition-all">
                      Track Milestones
                    </Button>
                  </Link>
                ) : (
                  <SignInButton>
                    <Button size="lg" className="bg-primary-500 hover:bg-primary-600 text-white shadow-lg hover:shadow-xl transition-all">
                      Get Started
                    </Button>
                  </SignInButton>
                )}
                <Link 
                  href={createRoute(Routes.about)}
                  aria-label="Learn More About Dad's First Step"
                >
                  <Button variant="outline" size="lg" className="border-primary-500 text-primary-500 hover:bg-primary-50">
                    Learn More
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="hidden md:block relative z-10"
            >
              <div className="bg-gradient-to-br from-primary-100 to-accent-100 rounded-full p-8 shadow-xl">
                <React.Suspense fallback={<IllustrationLoader />}>
                  <Image
                    src="/dad-baby-illustration.svg"
                    alt="Father and Child Playing"
                    width={500}
                    height={500}
                    className="w-full h-auto rounded-lg transform hover:scale-105 transition-transform duration-300"
                    priority
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                  />
                </React.Suspense>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent-100 rounded-full opacity-50 blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary-100 rounded-full opacity-50 blur-xl" />
            </motion.div>
          </div>
        </div>

        {/* Features Section */}
        <section 
          className="relative py-24 overflow-hidden"
          aria-labelledby="features-heading"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white via-primary-50/30 to-white" />
          <div className="container relative mx-auto px-4">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold mb-4">
                Features
              </span>
              <h2 
                id="features-heading" 
                className="text-4xl font-heading font-bold text-center mb-6 text-neutral-900"
              >
                Empowering Dads, One Milestone at a Time
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Track, learn, and celebrate every moment of your fatherhood journey with our comprehensive tools and resources.
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8">
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
        </section>

        {/* Personalized Section */}
        {_user && (
          <section 
            className="relative py-24 bg-gradient-to-br from-primary-50 to-white overflow-hidden" 
            aria-label="Personalized Milestone Overview"
          >
            <div className="absolute inset-0 bg-gradient-waves opacity-20" />
            <div className="container relative mx-auto px-4">
              <MilestoneOverview />
            </div>
          </section>
        )}

        {/* Call to Action */}
        <section 
          className="relative py-24 overflow-hidden bg-gradient-to-r from-primary-600 to-primary-700" 
          aria-labelledby="cta-heading"
        >
          <div className="absolute inset-0 bg-gradient-waves opacity-10" />
          <div className="container relative mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-white text-sm font-semibold mb-6">
                Join Our Community
              </span>
              <h2 
                id="cta-heading" 
                className="text-4xl font-heading font-bold mb-6 text-white"
              >
                Your Fatherhood Journey Matters
              </h2>
              <p className="text-xl mb-8 text-primary-50 leading-relaxed">
                Every dad&apos;s path is unique. We&apos;re here to support, guide, and celebrate you
                every step of the way.
              </p>

              {_user ? (
                <Link 
                  href={createRoute(Routes.milestones)}
                  aria-label="View Your Milestones"
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-white border-white hover:bg-white hover:text-primary-600 shadow-lg hover:shadow-xl transition-all"
                  >
                    View Your Milestones
                  </Button>
                </Link>
              ) : (
                <SignInButton>
                  <Button 
                    size="lg" 
                    className="bg-white text-primary-600 hover:bg-primary-50 shadow-lg hover:shadow-xl transition-all group"
                  >
                    Join Now{' '}
                    <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
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
