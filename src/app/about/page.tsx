'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  HiOutlineHeart, 
  HiOutlineSparkles, 
  HiOutlineUserGroup, 
  HiOutlineDocumentText,
  HiOutlineUser,
  HiOutlineLightBulb,
  HiOutlineGlobe
} from 'react-icons/hi';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

// Reusable Components
const SectionHeader = ({ title, subtitle }: { title: string, subtitle: string }) => (
  <div className="text-center mb-12">
    <h2 className="text-4xl font-bold text-neutral-900 mb-4">{title}</h2>
    <p className="text-xl text-neutral-600 max-w-3xl mx-auto">{subtitle}</p>
  </div>
);

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description 
}: { 
  icon: React.ElementType, 
  title: string, 
  description: string 
}) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white p-6 rounded-2xl shadow-lg border border-neutral-100 hover:border-primary-200 transition-all group"
  >
    <div className="flex items-center mb-4">
      <div className="bg-primary-50 p-3 rounded-full mr-4">
        <Icon className="h-8 w-8 text-primary-600 group-hover:rotate-12 transition-transform" />
      </div>
      <h3 className="text-xl font-bold text-neutral-800">{title}</h3>
    </div>
    <p className="text-neutral-600">{description}</p>
  </motion.div>
);

export default function AboutPage() {
  const router = useRouter();
  return (
    <div className="bg-gradient-to-br from-primary-50 to-white min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold mb-6 text-neutral-900">
              Supporting Dads, 
              <br />
              <span className="text-primary-600">One Step at a Time</span>
            </h1>
            <p className="text-xl text-neutral-600 mb-8">
              Dad&apos;s First Step is your digital companion through the incredible journey of fatherhood, 
              designed to empower, support, and celebrate every milestone.
            </p>
            <div className="flex space-x-4">
              <Button 
                className="hover:scale-105 transition-transform"
                onClick={() => router.push('/milestones')}
              >
                Start Your Journey
              </Button>
              <button 
                className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:scale-105 transition-transform"
                onClick={() => router.push('/discover')}
              >
                Learn More
              </button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="hidden md:block"
          >
            <Image 
              src="/illustrations/dad-baby.svg" 
              alt="Dad and Baby Illustration" 
              width={600} 
              height={600} 
              className="w-full h-auto"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="container mx-auto px-4 py-16 bg-white">
        <SectionHeader 
          title="Our Mission" 
          subtitle="To transform the fatherhood experience by providing innovative tools, resources, and support that empower dads to be confident, engaged, and present."
        />
        
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={HiOutlineLightBulb}
            title="Empowerment"
            description="Equip dads with knowledge, tools, and confidence to navigate fatherhood."
          />
          <FeatureCard 
            icon={HiOutlineGlobe}
            title="Connection"
            description="Create a supportive community where dads can learn, share, and grow together."
          />
          <FeatureCard 
            icon={HiOutlineHeart}
            title="Celebration"
            description="Recognize and cherish every unique moment of the fatherhood journey."
          />
        </div>
      </section>

      {/* Story Section */}
      <section className="container mx-auto px-4 py-16">
        <SectionHeader 
          title="Our Story" 
          subtitle="Born from a passion to support fathers, Dad's First Step began with a simple yet powerful idea: every dad deserves the tools to be their best self."
        />
        
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
          <div className="prose prose-lg text-neutral-700">
            <p>
              In 2024, our founder, a new dad himself, realized the lack of comprehensive, 
              supportive resources for fathers. Inspired by his own journey and the challenges 
              he faced, he set out to create a platform that would change the narrative of fatherhood.
            </p>
            <p>
              Dad&apos;s First Step is more than an app - it&apos;s a movement to redefine 
              fatherhood in the digital age, providing support, knowledge, and community.
            </p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="container mx-auto px-4 py-16 bg-white">
        <SectionHeader 
          title="Key Features" 
          subtitle="Designed with dads in mind, our platform offers unique tools to support your fatherhood journey."
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard 
            icon={HiOutlineDocumentText}
            title="Milestone Tracking"
            description="Comprehensive tracking of your child's developmental milestones."
          />
          <FeatureCard 
            icon={HiOutlineUserGroup}
            title="Community Support"
            description="Connect with other dads, share experiences, and learn together."
          />
          <FeatureCard 
            icon={HiOutlineSparkles}
            title="Expert Resources"
            description="Access curated content from child development experts."
          />
          <FeatureCard 
            icon={HiOutlineUser}
            title="Personalized Insights"
            description="Tailored advice and recommendations for your unique journey."
          />
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-primary-600 text-white p-12 rounded-3xl"
        >
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Fatherhood Journey?</h2>
          <p className="text-xl mb-8">
            Join thousands of dads who are capturing, celebrating, and understanding 
            every precious moment with Dad&apos;s First Step.
          </p>
          <Button 
            className="hover:scale-105 transition-transform"
            onClick={() => router.push('/signup')}
          >
            Create Your Free Account
          </Button>
        </motion.div>
      </section>
    </div>
  );
}
