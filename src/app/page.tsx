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
    className="bg-white shadow-lg rounded-xl p-6 text-center transition-all hover:shadow-xl border border-primary-100"
    role="article"
    aria-labelledby={`feature-${title.replace(/\s+/g, '-').toLowerCase()}`}
  >
    <div className="mb-4 flex justify-center">
      <Icon 
        className="w-12 h-12 text-primary-500 transition-colors group-hover:text-primary-600" 
        aria-hidden="true" 
      />
    </div>
    <h3 
      id={`feature-${title.replace(/\s+/g, '-').toLowerCase()}`} 
      className="text-xl font-heading font-bold mb-3 text-neutral-800"
    >
      {title}
    </h3>
    <p className="text-neutral-600 font-body">{description}</p>
  </motion.div>
));

FeatureCard.displayName = 'FeatureCard';

export default function Home() {
  const { _user } = useAuthStore();

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <main 
        className="min-h-screen bg-gradient-to-br from-primary-50 to-white font-body" 
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
            <h1 className="text-5xl font-heading font-bold mb-6 text-neutral-900 leading-tight">
              Your Journey into <span className="text-primary-600">Fatherhood</span> Starts Here
            </h1>
            <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
              Dad&apos;s First Step is more than an app. It&apos;s your companion through the most
              transformative adventure of your life.
            </p>

            <div className="flex flex-wrap gap-4">
              {_user ? (
                <Link 
                  href={{ pathname: Routes.milestones } as UrlObject}
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
                href={{ pathname: Routes.about } as UrlObject}
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
            className="hidden md:block"
          >
            <div className="bg-primary-100 rounded-full p-8 shadow-xl">
              <Image
                src="/dad-baby-illustration.svg"
                alt="Father and Baby Illustration"
                width={500}
                height={500}
                className="w-full h-auto rounded-lg transform hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* Features Section */}
        <section 
          className="container mx-auto px-4 py-16 bg-gradient-to-b from-white to-primary-50" 
          aria-labelledby="features-heading"
        >
          <h2 
            id="features-heading" 
            className="text-4xl font-heading font-bold text-center mb-12 text-neutral-900"
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
            className="container mx-auto px-4 py-16 bg-white" 
            aria-label="Personalized Milestone Overview"
          >
            <MilestoneOverview />
          </section>
        )}

        {/* Call to Action */}
        <section 
          className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-16" 
          aria-labelledby="cta-heading"
        >
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto"
            >
              <h2 
                id="cta-heading" 
                className="text-4xl font-heading font-bold mb-6"
              >
                Your Fatherhood Journey Matters
              </h2>
              <p className="text-xl mb-8 text-primary-50 leading-relaxed">
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
                    className="text-white border-white hover:bg-white hover:text-primary-600 shadow-lg hover:shadow-xl transition-all"
                  >
                    View Your Milestones
                  </Button>
                </Link>
              ) : (
                <SignInButton>
                  <Button 
                    size="lg" 
                    className="bg-white text-primary-600 hover:bg-primary-50 shadow-lg hover:shadow-xl transition-all"
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
