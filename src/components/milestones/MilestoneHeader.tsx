"use client";

import React from 'react';
import Link from 'next/link';
import { Routes } from '@/types/routes';
import { Button } from '@/components/ui/Button';

export function MilestoneHeader() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Baby Milestones</h1>
        <nav>
          <Link href={Routes.milestonesAdd}>
            <Button variant="default">Add Milestone</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}