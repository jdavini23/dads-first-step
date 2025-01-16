'use client';

import * as React from 'react';
import { Routes } from '@/types/routes';
import { TypedLink } from '@/components/common/TypedLink';
import { AppLink } from '@/components/common/AppLink';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/stores/authStore';
import { SignInButton } from '@/components/auth/SignInButton';
import { FaBaby, FaHeart, FaBook, FaCalendarCheck } from 'react-icons/fa';
import { MilestoneOverview } from '@/components/features/MilestoneOverview';
import { HTMLMotionProps } from 'framer-motion';

// Skeleton loader for illustration
const IllustrationLoader = () => (
  <div className="w-full h-64 bg-primary-100 animate-pulse rounded-lg"></div>
);

// Error Boundary Implementation
interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Error Fallback Component
const ErrorFallback = ({ error }: { error: Error }) => (
  <div className="min-h-screen flex items-center justify-center p-4">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
      <p className="text-neutral-600 mb-4">{error.message}</p>
      <Button onClick={() => window.location.reload()}>Try again</Button>
    </div>
  </div>
);

const HOVER_SCALE = 1.05;

interface FeatureCardProps {
  icon: React.ComponentType<{ className?: string }>;
  className?: string;
  title: string;
  description: string;
  id: string;
}

const FeatureCard: React.FC<FeatureCardProps> = React.memo(
  ({ icon: Icon, title, description, id, ...props }) => (
    <motion.div
      whileHover={{ scale: HOVER_SCALE }}
      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
      {...props}
    >
      <div className="bg-primary-100 rounded-lg p-4 inline-block mb-4">
        <Icon className="w-6 h-6 text-primary-600" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-neutral-900">{title}</h3>
      <p className="text-neutral-600">{description}</p>
    </motion.div>
  )
);

FeatureCard.displayName = 'FeatureCard';

export default function Home() {
  const { _user, loading } = useAuthStore();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-primary-600 text-2xl font-semibold">
          Loading your experience...
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary fallback={<ErrorFallback error={new Error('Unknown error')} />}>
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
                  <AppLink href={Routes.MILESTONES} aria-label="Track Milestones">
                    <Button
                      size="lg"
                      className="bg-primary-500 hover:bg-primary-600 text-white shadow-lg hover:shadow-xl transition-all"
                    >
                      Track Milestones
                    </Button>
                  </AppLink>
                ) : (
                  <SignInButton>
                    <Button
                      size="lg"
                      className="bg-primary-500 hover:bg-primary-600 text-white shadow-lg hover:shadow-xl transition-all"
                    >
                      Get Started
                    </Button>
                  </SignInButton>
                )}
                <TypedLink
                  route="ABOUT"
                  aria-label="Learn More About Dad's First Step"
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-primary-500 text-primary-500 hover:bg-primary-50"
                  >
                    Learn More
                  </Button>
                </TypedLink>
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
        <section className="relative py-24 overflow-hidden" aria-labelledby="features-heading">
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
                Track, learn, and celebrate every moment of your fatherhood journey with our
                comprehensive tools and resources.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <FeatureCard
                icon={FaBaby}
                title="Milestone Tracking"
                description="Capture and celebrate every precious moment of your child's development."
                id="milestone-tracking"
              />
              <FeatureCard
                icon={FaHeart}
                title="Emotional Support"
                description="Resources and community to support you through fatherhood's challenges."
                id="emotional-support"
              />
              <FeatureCard
                icon={FaBook}
                title="Learning Resources"
                description="Expert guides and tips to help you navigate parenting confidently."
                id="learning-resources"
              />
              <FeatureCard
                icon={FaCalendarCheck}
                title="Progress Insights"
                description="Understand your child's growth and developmental stages."
                id="progress-insights"
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
              <h2 id="cta-heading" className="text-4xl font-heading font-bold mb-6 text-white">
                Your Fatherhood Journey Matters
              </h2>
              <p className="text-xl mb-8 text-primary-50 leading-relaxed">
                Every dad&apos;s path is unique. We&apos;re here to support, guide, and celebrate
                you every step of the way.
              </p>

              {_user ? (
                <AppLink href={Routes.MILESTONES} aria-label="View Your Milestones">
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-white border-white hover:bg-white hover:text-primary-600 shadow-lg hover:shadow-xl transition-all"
                  >
                    View Your Milestones
                  </Button>
                </AppLink>
              ) : (
                <SignInButton>
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-white border-white hover:bg-white hover:text-primary-600 shadow-lg hover:shadow-xl transition-all"
                  >
                    Start Your Journey
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
