'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl font-bold mb-8 text-center">About Dad&apos;s First Step</h1>

          <div className="prose prose-lg mx-auto">
            <p className="text-xl text-gray-600 mb-8">
              Dad&apos;s First Step is more than just a milestone tracking app - it&apos;s your
              companion through the incredible journey of fatherhood. We understand that becoming a
              dad is a transformative experience filled with joy, challenges, and countless precious
              moments.
            </p>

            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-gray-600 mb-8">
              We&apos;re here to support dads in capturing, celebrating, and understanding their
              child&apos;s development. Our platform combines expert knowledge with an intuitive
              interface to make tracking your baby&apos;s milestones both meaningful and enjoyable.
            </p>

            <h2 className="text-3xl font-bold mb-6">Features</h2>
            <ul className="space-y-4 text-gray-600 mb-8">
              <li>✓ Comprehensive milestone tracking across different developmental areas</li>
              <li>✓ Expert-curated guidance and tips</li>
              <li>✓ Personalized progress insights</li>
              <li>✓ Community support and shared experiences</li>
            </ul>

            <div className="mt-12 text-center">
              <Link href="/">
                <Button size="lg" className="mr-4">
                  Get Started
                </Button>
              </Link>
              <Link href="/milestones">
                <Button variant="outline" size="lg">
                  View Milestones
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
