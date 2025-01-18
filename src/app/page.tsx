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
import { UrlObject } from 'url';

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
  console.log('Home component rendering');
  
  try {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm lg:flex">
          <h1 className="text-4xl font-bold text-center">
            Welcome to Dad&apos;s First Step
          </h1>
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error rendering Home component:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Error loading page: {error instanceof Error ? error.message : 'Unknown error'}</p>
      </div>
    );
  }
}
